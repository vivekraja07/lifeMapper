/**
 * Dev-only HTTP handlers mounted by vue-cli-service devServer.before.
 * Writes src/data/data.json and uploads to src/assets/icons without extra npm deps.
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const DATA_JSON = path.join(ROOT, 'src/data/data.json')
const EVENT_ORDER_JSON = path.join(ROOT, 'src/data/eventOrder.json')
const ICONS_DIR = path.join(ROOT, 'src/assets/icons')

function parseJsonBody (req, res, next) {
  const ct = req.headers['content-type'] || ''
  if (req.method !== 'POST' || ct.split(';')[0].trim() !== 'application/json') {
    next()
    return
  }
  let body = ''
  req.setEncoding('utf8')
  req.on('data', (chunk) => {
    body += chunk
    if (body.length > 80 * 1024 * 1024) {
      req.destroy()
      res.statusCode = 413
      res.end('Too large')
    }
  })
  req.on('end', () => {
    try {
      req.body = body ? JSON.parse(body) : {}
    } catch (e) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Invalid JSON body' }))
      return
    }
    next()
  })
}

function safeIconName (name) {
  const base = path.basename(name).replace(/[^a-zA-Z0-9._-]/g, '_')
  if (!base || base === '.' || base === '..') return null
  if (!/\.(png|jpe?g|gif|webp|svg)$/i.test(base)) return null
  return base
}

function redirectEditorPathToHash (req, res, next) {
  // Vue Router defaults to hash mode: the editor route is /#/editor, not /editor.
  // Typing /editor in the address bar otherwise loads "/" and shows Home.
  const pathOnly = (req.url || '').split('?')[0]
  if (req.method === 'GET' && (pathOnly === '/editor' || pathOnly === '/editor/')) {
    res.writeHead(302, { Location: '/#/editor' })
    res.end()
    return
  }
  next()
}

function mount (app) {
  app.use(redirectEditorPathToHash)
  app.use(parseJsonBody)

  app.post('/api/lifemap/save', (req, res) => {
    try {
      const body = req.body || {}
      const eventsMap =
        body.events && typeof body.events === 'object' && !Array.isArray(body.events)
          ? body.events
          : null
      const orderArr = Array.isArray(body.eventOrder) ? body.eventOrder : null

      // Editor sends { events, eventOrder }. Never persist that wrapper as data.json.
      if (eventsMap && orderArr) {
        fs.writeFileSync(DATA_JSON, JSON.stringify(eventsMap, null, 2) + '\n', 'utf8')
        fs.writeFileSync(EVENT_ORDER_JSON, JSON.stringify(orderArr, null, 2) + '\n', 'utf8')
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ ok: true, dataPath: DATA_JSON, eventOrderPath: EVENT_ORDER_JSON }))
        return
      }

      if (eventsMap && !orderArr) {
        fs.writeFileSync(DATA_JSON, JSON.stringify(eventsMap, null, 2) + '\n', 'utf8')
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ ok: true, dataPath: DATA_JSON, partial: true }))
        return
      }

      const text = JSON.stringify(body, null, 2) + '\n'
      fs.writeFileSync(DATA_JSON, text, 'utf8')
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ ok: true, path: DATA_JSON, legacy: true }))
    } catch (e) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ ok: false, error: String(e.message) }))
    }
  })

  app.post('/api/lifemap/upload-icon', (req, res) => {
    try {
      const { filename, dataBase64 } = req.body || {}
      const safe = safeIconName(filename || '')
      if (!safe) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ ok: false, error: 'Invalid or unsupported filename' }))
        return
      }
      const raw = typeof dataBase64 === 'string' ? dataBase64 : ''
      const b64 = raw.includes('base64,') ? raw.split('base64,')[1] : raw
      const buf = Buffer.from(b64, 'base64')
      if (!buf.length) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ ok: false, error: 'Empty image data' }))
        return
      }
      if (!fs.existsSync(ICONS_DIR)) {
        fs.mkdirSync(ICONS_DIR, { recursive: true })
      }
      const dest = path.join(ICONS_DIR, safe)
      fs.writeFileSync(dest, buf)
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ ok: true, filename: safe, path: dest }))
    } catch (e) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ ok: false, error: String(e.message) }))
    }
  })
}

module.exports = { mount }
