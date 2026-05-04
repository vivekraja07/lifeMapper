/**
 * data.json must be a flat map: period title → { start, end, loc, zoom, info }.
 * Broken saves sometimes stored { events: { ... }, eventOrder: [...] } in data.json.
 */
export function parseLifeMapDataFile (raw) {
  if (!raw || typeof raw !== 'object') {
    return { events: {}, orderOverride: null }
  }
  if (
    Object.prototype.hasOwnProperty.call(raw, 'events') &&
    raw.events &&
    typeof raw.events === 'object' &&
    !Array.isArray(raw.events)
  ) {
    const eo = raw.eventOrder
    return {
      events: JSON.parse(JSON.stringify(raw.events)),
      orderOverride: Array.isArray(eo) ? JSON.parse(JSON.stringify(eo)) : null
    }
  }
  return { events: JSON.parse(JSON.stringify(raw)), orderOverride: null }
}

export function normalizeEventsMap (raw) {
  return parseLifeMapDataFile(raw).events
}
