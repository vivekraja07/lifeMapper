<template>
  <div class="data-editor">
    <header class="data-editor__bar">
      <h1 class="data-editor__title">Life map data editor</h1>
      <p class="data-editor__hint">
        Runs only with <code>npm run serve</code>. Open this screen via <strong><code>/#/editor</code></strong> (hash URL) or use <strong>Open data editor</strong> on the home page. Saves into <code>src/data/data.json</code>; timeline logos upload to <code>src/assets/icons/</code> (see <code>src/assets/README.md</code>).
      </p>
      <div class="data-editor__actions">
        <router-link class="data-editor__link" to="/">View site</router-link>
        <button type="button" class="btn" :disabled="saving" @click="saveToDisk">
          Save to disk
        </button>
        <button type="button" class="btn btn--ghost" @click="downloadJson">
          Download data.json
        </button>
        <button type="button" class="btn btn--ghost" @click="downloadEventOrderJson">
          Download eventOrder.json
        </button>
        <button type="button" class="btn btn--ghost" @click="resetToBundled">
          Reset to bundled data
        </button>
      </div>
      <p v-if="saveMessage" class="data-editor__msg" role="status">{{ saveMessage }}</p>
    </header>

    <div class="data-editor__grid">
      <aside class="data-editor__panel">
        <label class="field">
          <span class="field__label">Time period</span>
          <select v-model="activeKey" class="field__control">
            <option v-for="k in eventOrder" :key="k" :value="k">{{ k }}</option>
          </select>
        </label>

        <div class="add-period">
          <span class="field__label">New time period</span>
          <div class="add-period__row">
            <input
              v-model="newPeriodLabel"
              type="text"
              class="field__control"
              placeholder='e.g. January 2026 to March 2026'
              @keyup.enter="addNewPeriod"
            >
            <button type="button" class="btn btn--ghost btn--small" @click="addNewPeriod">
              Add new
            </button>
          </div>
          <p class="data-editor__fineprint add-period__hint">
            Copies the <strong>currently selected</strong> period as a starting point. Then edit dates, map, and JSON below. Save to disk writes both <code>data.json</code> and <code>eventOrder.json</code>.
          </p>
        </div>

        <h2 class="data-editor__h">Map &amp; range</h2>
        <label class="field">
          <span class="field__label">start</span>
          <input v-model="currentEvent.start" class="field__control" >
        </label>
        <label class="field">
          <span class="field__label">end</span>
          <input v-model="currentEvent.end" class="field__control" >
        </label>
        <label class="field">
          <span class="field__label">Latitude</span>
          <input
            type="number"
            step="any"
            class="field__control"
            :value="latVal"
            @input="patchLoc(0, $event.target.value)"
          >
        </label>
        <label class="field">
          <span class="field__label">Longitude</span>
          <input
            type="number"
            step="any"
            class="field__control"
            :value="lngVal"
            @input="patchLoc(1, $event.target.value)"
          >
        </label>
        <label class="field">
          <span class="field__label">zoom</span>
          <input v-model.number="currentEvent.zoom" type="number" class="field__control" >
        </label>

        <h2 class="data-editor__h">General</h2>
        <label class="field">
          <span class="field__label">Title</span>
          <input v-model="generalTitle" class="field__control" >
        </label>
        <label class="field">
          <span class="field__label">Location</span>
          <input v-model="generalLocation" class="field__control" >
        </label>

        <h2 class="data-editor__h">Languages</h2>
        <div v-for="lk in languageSectionKeys" :key="'lang-' + lk" class="lang-card">
          <h3 class="data-editor__subh">{{ lk }}</h3>
          <table class="lang-table">
            <thead>
              <tr>
                <th>Language</th>
                <th>Skill</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in currentInfo[lk]" :key="i">
                <td>
                  <input v-model="row.name" class="field__control field__control--sm" >
                </td>
                <td>
                  <input v-model="row.skill" class="field__control field__control--sm" >
                </td>
                <td>
                  <button type="button" class="btn btn--mini" @click="removeLanguageRow(lk, i)">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="button" class="btn btn--ghost btn--small" @click="addLanguageRow(lk)">Add row</button>
        </div>

        <h2 class="data-editor__h">Other sections (JSON)</h2>
        <p class="data-editor__fineprint">
          Jobs, Activities, Education, Projects, etc. Paste valid JSON and click Apply or blur. Use <strong>Remove section</strong> to drop a whole block, or remove rows under Activities/Jobs arrays.
        </p>
        <div v-for="key in otherSectionKeys" :key="key" class="json-card">
          <div class="json-card__head">
            <h3 class="data-editor__subh">{{ key }}</h3>
            <button
              type="button"
              class="btn btn--danger btn--small"
              @click="removeInfoSection(key)"
            >
              Remove section
            </button>
          </div>
          <ul v-if="isArraySection(key)" class="json-card__rows">
            <li v-for="(item, idx) in currentInfo[key]" :key="idx" class="json-card__row">
              <span class="json-card__rowLabel">{{ arrayEntryLabel(item, idx) }}</span>
              <button
                type="button"
                class="btn btn--mini btn--ghost"
                @click="removeArraySectionItem(key, idx)"
              >
                Remove
              </button>
            </li>
          </ul>
          <textarea
            v-model="sectionDrafts[key]"
            class="json-card__ta"
            rows="10"
            spellcheck="false"
            @blur="applySection(key)"
          />
          <button type="button" class="btn btn--small" @click="applySection(key)">Apply JSON</button>
        </div>

        <h2 class="data-editor__h">Icon upload</h2>
        <p class="data-editor__fineprint">
          Upload copies the file into <code>src/assets/icons/</code> (dev server only). Then attach it to a slot below. Other static images live under <code>src/assets/social/</code>, <code>ui/</code>, and <code>brand/</code>—see <code>src/assets/README.md</code>.
        </p>
        <input type="file" accept="image/*" class="data-editor__file" @change="onPickIcon" >
        <p v-if="lastUploadedFilename" class="data-editor__last">
          Last upload: <code>{{ lastUploadedFilename }}</code>
        </p>
        <label class="field">
          <span class="field__label">Set icon on</span>
          <select v-model="iconTarget" class="field__control">
            <option value="">— choose —</option>
            <option v-for="opt in iconTargetOptions" :key="opt.id" :value="opt.id">{{ opt.label }}</option>
          </select>
        </label>
        <button type="button" class="btn" :disabled="!lastUploadedFilename || !iconTarget" @click="applyUploadedIcon">
          Apply uploaded file to selection
        </button>
      </aside>

      <section class="data-editor__preview">
        <h2 class="data-editor__preview-title">Live preview</h2>
        <p class="data-editor__fineprint">
          Same components as the home page center column. Use arrow keys on the date strip to switch periods (updates preview).
        </p>
        <div class="data-editor__preview-shell">
          <Information :events="events" :event-order="eventOrder" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Information from '@/components/information/Information.vue'
import baselineData from '@/data/data.json'
import baselineEventOrder from '@/data/eventOrder.json'
import { parseLifeMapDataFile } from '@/utils/lifeMapData'

const parsedBaseline = parseLifeMapDataFile(baselineData)
const baselineOrderEmbedded = parsedBaseline.orderOverride

const defaultPeriodSource = baselineOrderEmbedded || baselineEventOrder
const defaultPeriod =
  defaultPeriodSource.length > 0 ? defaultPeriodSource[defaultPeriodSource.length - 1] : ''

function emptyPeriodTemplate () {
  return {
    start: 'January-2026',
    end: 'Present',
    loc: [37.79136573465197, -122.39794588682582],
    zoom: 15,
    info: {
      General: {
        title: 'New chapter',
        Location: ''
      },
      Languages: [
        { name: 'English', skill: '100%' }
      ]
    }
  }
}

function deepClone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

export default {
  name: 'DataEditor',
  components: { Information },
  data () {
    return {
      events: {},
      activeKey: defaultPeriod,
      eventOrder: JSON.parse(JSON.stringify(
        baselineOrderEmbedded || baselineEventOrder
      )),
      newPeriodLabel: '',
      sectionDrafts: {},
      saving: false,
      saveMessage: '',
      lastUploadedFilename: '',
      iconTarget: ''
    }
  },
  computed: {
    currentEvent () {
      const ev = this.events[this.activeKey]
      if (!ev) {
        return { start: '', end: '', loc: [0, 0], zoom: 12, info: {} }
      }
      if (!ev.loc || ev.loc.length < 2) {
        return { ...ev, loc: [0, 0] }
      }
      return ev
    },
    latVal () {
      const loc = this.currentEvent.loc
      return loc && loc.length ? loc[0] : 0
    },
    lngVal () {
      const loc = this.currentEvent.loc
      return loc && loc.length > 1 ? loc[1] : 0
    },
    currentInfo () {
      const ev = this.events[this.activeKey]
      if (!ev || !ev.info) return {}
      return ev.info
    },
    generalTitle: {
      get () {
        const g = this.currentInfo.General
        return g && g.title != null ? g.title : ''
      },
      set (v) {
        this.ensureGeneral()
        this.$set(this.currentInfo.General, 'title', v)
      }
    },
    generalLocation: {
      get () {
        const g = this.currentInfo.General
        return g && g.Location != null ? g.Location : ''
      },
      set (v) {
        this.ensureGeneral()
        this.$set(this.currentInfo.General, 'Location', v)
      }
    },
    languageSectionKeys () {
      return Object.keys(this.currentInfo).filter((k) => k.includes('Languages'))
    },
    otherSectionKeys () {
      return Object.keys(this.currentInfo).filter((k) => k !== 'General' && !k.includes('Languages'))
    },
    iconTargetOptions () {
      const opts = []
      const info = this.currentInfo
      if (!info) return opts
      Object.keys(info).forEach((key) => {
        if (key === 'General' || key.includes('Languages')) return
        const val = info[key]
        if (Array.isArray(val)) {
          val.forEach((item, i) => {
            if (item && typeof item === 'object' && Object.prototype.hasOwnProperty.call(item, 'icon')) {
              opts.push({ id: `${key}:${i}`, label: `${key}[${i}].icon` })
            }
          })
        } else if (val && typeof val === 'object' && Object.prototype.hasOwnProperty.call(val, 'icon')) {
          opts.push({ id: `${key}:single`, label: `${key}.icon` })
        }
      })
      return opts
    }
  },
  watch: {
    activeKey (v) {
      this.$store.commit('setActive', v)
      this.refreshSectionDrafts()
      this.iconTarget = ''
    }
  },
  created () {
    const norm = parseLifeMapDataFile(baselineData)
    this.events = norm.events
    if (norm.orderOverride) {
      this.eventOrder = norm.orderOverride
    }
    const initial = this.eventOrder.includes(this.$store.state.active)
      ? this.$store.state.active
      : this.eventOrder[this.eventOrder.length - 1]
    this.activeKey = initial
    this.$store.commit('setActive', initial)
    this.refreshSectionDrafts()
  },
  methods: {
    ensureGeneral () {
      const ev = this.events[this.activeKey]
      if (!ev.info) this.$set(ev, 'info', {})
      if (!ev.info.General) this.$set(ev.info, 'General', { title: '', Location: '' })
    },
    patchLoc (index, raw) {
      const ev = this.events[this.activeKey]
      if (!ev.loc || ev.loc.length < 2) {
        this.$set(ev, 'loc', [0, 0])
      }
      const n = parseFloat(String(raw))
      this.$set(ev.loc, index, Number.isFinite(n) ? n : 0)
    },
    refreshSectionDrafts () {
      const drafts = {}
      this.otherSectionKeys.forEach((key) => {
        drafts[key] = JSON.stringify(this.currentInfo[key], null, 2)
      })
      this.sectionDrafts = drafts
    },
    addNewPeriod () {
      const label = (this.newPeriodLabel || '').trim()
      if (!label) {
        this.saveMessage = 'Enter a label for the new period (shown on the timeline).'
        return
      }
      if (this.events[label]) {
        this.saveMessage = `“${label}” already exists — pick another name or edit that period.`
        return
      }
      const base = this.events[this.activeKey]
      const clone = base ? deepClone(base) : emptyPeriodTemplate()
      this.$set(this.events, label, clone)
      this.eventOrder.push(label)
      this.activeKey = label
      this.newPeriodLabel = ''
      this.$store.commit('setActive', label)
      this.refreshSectionDrafts()
      this.saveMessage = `Added “${label}”. Edit fields below, then Save to disk.`
    },
    applySection (key) {
      const text = this.sectionDrafts[key]
      if (text === undefined) return
      try {
        const parsed = JSON.parse(text)
        this.$set(this.currentInfo, key, parsed)
        this.saveMessage = `Applied “${key}”.`
      } catch (e) {
        this.saveMessage = `JSON error in “${key}”: ${e.message}`
      }
    },
    isArraySection (key) {
      return Array.isArray(this.currentInfo[key])
    },
    arrayEntryLabel (item, idx) {
      if (item && typeof item === 'object') {
        const t = item.title || item.name
        if (t) return `${idx + 1}. ${t}`
      }
      return `Entry ${idx + 1}`
    },
    removeArraySectionItem (key, index) {
      const arr = this.currentInfo[key]
      if (!Array.isArray(arr) || index < 0 || index >= arr.length) return
      arr.splice(index, 1)
      if (arr.length === 0) {
        this.$delete(this.currentInfo, key)
        this.saveMessage = `Removed last entry; dropped section “${key}”.`
      } else {
        this.saveMessage = `Removed an entry from “${key}”.`
      }
      this.refreshSectionDrafts()
      this.iconTarget = ''
    },
    removeInfoSection (key) {
      if (!window.confirm(`Remove the entire “${key}” section from this period? This cannot be undone except by resetting or re‑adding JSON.`)) return
      this.$delete(this.currentInfo, key)
      this.refreshSectionDrafts()
      this.iconTarget = ''
      this.saveMessage = `Removed section “${key}”.`
    },
    addLanguageRow (key) {
      const list = this.currentInfo[key]
      if (!Array.isArray(list)) return
      list.push({ name: '', skill: '0%' })
    },
    removeLanguageRow (key, index) {
      const list = this.currentInfo[key]
      if (!Array.isArray(list)) return
      list.splice(index, 1)
    },
    async onPickIcon (e) {
      const file = e.target.files && e.target.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = async () => {
        try {
          const res = await fetch('/api/lifemap/upload-icon', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: file.name,
              dataBase64: reader.result
            })
          })
          const j = await res.json()
          if (j.ok) {
            this.lastUploadedFilename = j.filename
            this.saveMessage = `Uploaded icon “${j.filename}”.`
          } else {
            this.saveMessage = j.error || 'Upload failed.'
          }
        } catch (err) {
          this.saveMessage = `Upload failed (is the dev server running?): ${err.message}`
        }
      }
      reader.readAsDataURL(file)
      e.target.value = ''
    },
    applyUploadedIcon () {
      const filename = this.lastUploadedFilename
      const target = this.iconTarget
      if (!filename || !target) return
      const info = this.currentInfo
      if (target.endsWith(':single')) {
        const section = target.slice(0, -':single'.length)
        const obj = info[section]
        if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
          this.$set(obj, 'icon', filename)
          this.saveMessage = `Set ${section}.icon = ${filename}`
          this.refreshSectionDrafts()
        }
        return
      }
      const colon = target.lastIndexOf(':')
      const section = target.slice(0, colon)
      const idx = parseInt(target.slice(colon + 1), 10)
      const arr = info[section]
      if (Array.isArray(arr) && arr[idx] && typeof arr[idx] === 'object') {
        this.$set(arr[idx], 'icon', filename)
        this.saveMessage = `Set ${section}[${idx}].icon = ${filename}`
        this.refreshSectionDrafts()
      }
    },
    async saveToDisk () {
      this.saving = true
      this.saveMessage = ''
      try {
        const res = await fetch('/api/lifemap/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            events: this.events,
            eventOrder: this.eventOrder
          })
        })
        const j = await res.json().catch(() => ({}))
        if (res.ok && j.ok) {
          this.saveMessage = 'Saved src/data/data.json and src/data/eventOrder.json.'
        } else {
          this.saveMessage = j.error || `Save failed (${res.status}).`
        }
      } catch (e) {
        this.saveMessage = `Save failed: ${e.message}. Use “Download data.json” / “Download eventOrder.json” and replace files manually.`
      }
      this.saving = false
    },
    downloadJson () {
      const blob = new Blob([JSON.stringify(this.events, null, 2) + '\n'], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'data.json'
      a.click()
      URL.revokeObjectURL(url)
      this.saveMessage = 'Download started.'
    },
    downloadEventOrderJson () {
      const blob = new Blob([JSON.stringify(this.eventOrder, null, 2) + '\n'], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'eventOrder.json'
      a.click()
      URL.revokeObjectURL(url)
      this.saveMessage = 'eventOrder.json download started.'
    },
    resetToBundled () {
      if (!window.confirm('Discard all edits and reload data from the bundled JSON?')) return
      const norm = parseLifeMapDataFile(baselineData)
      this.events = norm.events
      this.eventOrder = norm.orderOverride
        ? norm.orderOverride
        : JSON.parse(JSON.stringify(baselineEventOrder))
      const initial = this.eventOrder[this.eventOrder.length - 1]
      this.activeKey = initial
      this.$store.commit('setActive', initial)
      this.refreshSectionDrafts()
      this.saveMessage = 'Reset to bundled data (not written to disk yet).'
    }
  }
}
</script>

<style scoped>
.data-editor {
  min-height: 100%;
  text-align: left;
  background: var(--color-bg, #e8edf3);
  color: var(--color-ink, #0f172a);
  font-size: 0.9375rem;
  line-height: 1.45;
}

.data-editor__bar {
  padding: 1rem 1.25rem 1.25rem;
  background: var(--color-surface, #fff);
  border-bottom: var(--border-section-width, 3px) solid var(--color-border, #e2e8f0);
  box-shadow: var(--shadow-sm, 0 1px 2px rgba(15, 23, 42, 0.06));
}

.data-editor__title {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0 0 0.35rem;
}

.data-editor__hint {
  margin: 0 0 0.75rem;
  font-size: 0.8125rem;
  color: var(--color-muted, #64748b);
}

.data-editor__hint code {
  font-size: 0.8em;
  padding: 0.1em 0.35em;
  border-radius: 4px;
  background: rgba(15, 23, 42, 0.06);
}

.data-editor__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.data-editor__link {
  color: var(--color-accent, #0ea5e9);
  font-weight: 600;
  text-decoration: none;
  margin-right: 0.5rem;
}

.data-editor__link:hover {
  text-decoration: underline;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 0.85rem;
  border-radius: var(--radius, 10px);
  font: inherit;
  font-weight: 600;
  font-size: 0.8125rem;
  cursor: pointer;
  border: var(--border-section-width, 3px) solid var(--color-accent, #0ea5e9);
  background: var(--color-accent, #0ea5e9);
  color: #fff;
}

.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.btn--ghost {
  background: var(--color-surface, #fff);
  color: var(--color-accent, #0ea5e9);
}

.btn--ghost:hover:not(:disabled) {
  background: var(--color-accent-soft, rgba(14, 165, 233, 0.12));
}

.btn--small {
  padding: 0.35rem 0.65rem;
  font-size: 0.75rem;
}

.btn--mini {
  padding: 0.2rem 0.45rem;
  font-size: 0.7rem;
  border-width: 1px;
}

.btn--danger {
  border-color: #b91c1c;
  background: #fff;
  color: #b91c1c;
}

.btn--danger:hover:not(:disabled) {
  background: rgba(185, 28, 28, 0.08);
}

.json-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.35rem;
}

.json-card__head .data-editor__subh {
  margin-bottom: 0;
}

.json-card__rows {
  list-style: none;
  margin: 0 0 0.5rem;
  padding: 0;
  font-size: 0.8125rem;
}

.json-card__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.28rem 0;
  border-bottom: 1px solid rgba(226, 232, 240, 0.9);
}

.json-card__row:last-child {
  border-bottom: none;
}

.json-card__rowLabel {
  flex: 1;
  min-width: 0;
  color: var(--color-muted, #64748b);
  text-align: left;
}

.data-editor__msg {
  margin: 0.65rem 0 0;
  font-size: 0.875rem;
  color: var(--color-muted, #64748b);
}

.data-editor__grid {
  display: grid;
  grid-template-columns: minmax(320px, 420px) 1fr;
  gap: 0;
  align-items: start;
  min-height: calc(100vh - 140px);
}

@media (max-width: 960px) {
  .data-editor__grid {
    grid-template-columns: 1fr;
  }
}

.data-editor__panel {
  padding: 1rem 1.25rem 2rem;
  border-right: var(--border-section-width, 3px) solid var(--color-border, #e2e8f0);
  background: rgba(255, 255, 255, 0.65);
  max-height: calc(100vh - 120px);
  overflow: auto;
}

.data-editor__preview {
  padding: 1rem 1rem 2rem;
  background: var(--color-bg, #e8edf3);
  min-width: 0;
}

.data-editor__preview-title {
  font-size: 1.05rem;
  margin: 0 0 0.35rem;
  font-weight: 700;
}

.data-editor__h {
  font-size: 0.95rem;
  margin: 1.25rem 0 0.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.data-editor__subh {
  font-size: 0.85rem;
  margin: 0 0 0.45rem;
  font-weight: 600;
  color: var(--color-muted, #64748b);
}

.data-editor__fineprint {
  font-size: 0.78rem;
  color: var(--color-muted, #64748b);
  margin: 0 0 0.65rem;
}

.field {
  display: block;
  margin-bottom: 0.65rem;
}

.field__label {
  display: block;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-muted, #64748b);
  margin-bottom: 0.2rem;
}

.field__control {
  width: 100%;
  box-sizing: border-box;
  padding: 0.45rem 0.55rem;
  border-radius: 8px;
  border: 1px solid var(--color-border, #e2e8f0);
  font: inherit;
  background: var(--color-surface, #fff);
}

.field__control--sm {
  padding: 0.3rem 0.4rem;
  font-size: 0.8125rem;
}

.add-period {
  margin-bottom: 1rem;
  padding: 0.65rem 0.75rem;
  background: var(--color-surface, #fff);
  border-radius: var(--radius, 10px);
  border: 1px solid var(--color-border, #e2e8f0);
}

.add-period__row {
  display: flex;
  gap: 0.45rem;
  align-items: stretch;
  flex-wrap: wrap;
}

.add-period__row .field__control {
  flex: 1;
  min-width: 12rem;
}

.add-period__hint {
  margin-top: 0.45rem;
  margin-bottom: 0;
}

.lang-card {
  margin-bottom: 1rem;
  padding: 0.65rem 0.75rem;
  background: var(--color-surface, #fff);
  border-radius: var(--radius, 10px);
  border: 1px solid var(--color-border, #e2e8f0);
}

.lang-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
  margin-bottom: 0.45rem;
}

.lang-table th {
  text-align: left;
  padding: 0.25rem 0.35rem 0.35rem 0;
  color: var(--color-muted, #64748b);
  font-weight: 600;
}

.lang-table td {
  padding: 0.2rem 0.35rem 0.2rem 0;
  vertical-align: middle;
}

.json-card {
  margin-bottom: 1rem;
}

.json-card__ta {
  width: 100%;
  box-sizing: border-box;
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: 0.75rem;
  line-height: 1.4;
  padding: 0.55rem 0.6rem;
  border-radius: 8px;
  border: 1px solid var(--color-border, #e2e8f0);
  background: #0f172a;
  color: #e2e8f0;
  resize: vertical;
  margin-bottom: 0.4rem;
}

.data-editor__file {
  margin-bottom: 0.5rem;
  font-size: 0.8125rem;
}

.data-editor__last {
  font-size: 0.8125rem;
  margin: 0 0 0.65rem;
}

.data-editor__preview-shell {
  background: var(--color-surface, #fff);
  border-radius: var(--radius, 12px);
  border: var(--border-section-width, 3px) solid var(--color-border, #e2e8f0);
  box-shadow: var(--shadow-md, 0 4px 24px rgba(15, 23, 42, 0.08));
  height: min(78vh, 900px);
  overflow: hidden;
  position: relative;
}

.data-editor__preview-shell >>> #features {
  height: 100%;
  width: 100%;
}

.data-editor__preview-shell >>> #events {
  height: calc(100% - 52px);
}
</style>
