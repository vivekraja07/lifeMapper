/**
 * Google Analytics 4 (gtag.js) for the site.
 *
 * - Measurement ID comes from VUE_APP_GA_MEASUREMENT_ID (see .env.production).
 * - Only sends data on the production host; elsewhere events are logged to the
 *   console so you can see what would be tracked.
 * - The app uses hash routing, so page views are sent manually on every route change.
 * - Custom events:
 *     select_time_period  { period }            timeline period picked
 *     select_tab          { tab }               left panel tab (Map / Profile / Projects / Skills)
 *     toggle_sidebar      { open }
 *     link_click          { link_type, link_url, link_text, link_domain }
 *       link_type: resume | social | project | activity | other
 */

const MEASUREMENT_ID = process.env.VUE_APP_GA_MEASUREMENT_ID
const PROD_HOSTS = ['vivekraja.me', 'www.vivekraja.me']

const SOCIAL_DOMAINS = [
  'linkedin.com', 'github.com', 'devpost.com', 'medium.com', 'strava.com', 'chess.com'
]

const host = typeof window !== 'undefined' ? window.location.hostname : ''
const enabled = Boolean(MEASUREMENT_ID) &&
  process.env.NODE_ENV === 'production' &&
  PROD_HOSTS.indexOf(host) !== -1

function gtag () {
  window.dataLayer.push(arguments)
}

export function track (name, params = {}) {
  if (enabled) {
    gtag('event', name, params)
  } else if (process.env.NODE_ENV !== 'production') {
    console.debug('[analytics]', name, params)
  }
}

function pagePath (route) {
  // Hash routing: report "/#/slides" style paths so routes are distinguishable in GA.
  return route.fullPath === '/' ? '/' : '/#' + route.fullPath
}

function linkType (url, el) {
  // Components mark regions with data-analytics-area="project" | "activity".
  const area = el.closest('[data-analytics-area]')
  if (area) return area.getAttribute('data-analytics-area')
  if (url.hostname === 'drive.google.com') return 'resume'
  if (SOCIAL_DOMAINS.some(d => url.hostname === d || url.hostname.endsWith('.' + d))) return 'social'
  return 'other'
}

function linkText (a, url) {
  // Many links are icon-only, so fall back to aria-label / title / the URL itself.
  const text = (a.textContent || '').trim() ||
    a.getAttribute('aria-label') ||
    a.getAttribute('title') ||
    url.hostname.replace(/^www\./, '') + url.pathname.replace(/\/$/, '')
  return text.trim().slice(0, 100)
}

function onDocumentClick (e) {
  const a = e.target && e.target.closest && e.target.closest('a[href]')
  if (!a) return
  let url
  try {
    url = new URL(a.href, window.location.href)
  } catch (err) {
    return
  }
  if (url.hostname === window.location.hostname) return // internal / hash links
  track('link_click', {
    link_type: linkType(url, a),
    link_url: url.href,
    link_domain: url.hostname,
    link_text: linkText(a, url)
  })
}

export function initAnalytics ({ router, store }) {
  if (enabled) {
    window.dataLayer = window.dataLayer || []
    window.gtag = gtag
    gtag('js', new Date())
    // Page views are sent from the router hook below.
    gtag('config', MEASUREMENT_ID, { send_page_view: false })

    const s = document.createElement('script')
    s.async = true
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID)
    document.head.appendChild(s)
  }

  router.afterEach(to => {
    track('page_view', {
      page_path: pagePath(to),
      page_location: window.location.href,
      page_title: document.title + (to.name && to.name !== 'home' ? ' – ' + to.name : '')
    })
  })

  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case 'setActive':
        track('select_time_period', { period: String(mutation.payload) })
        break
      case 'setLeftSidePick':
        track('select_tab', { tab: String(mutation.payload) })
        break
      case 'toggleSideBar':
        track('toggle_sidebar', { open: state.sidebarOpen })
        break
    }
  })

  document.addEventListener('click', onDocumentClick, true)
}
