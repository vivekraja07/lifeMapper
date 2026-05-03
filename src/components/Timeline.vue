<template>
  <div id="timeContainer">
    <div id="eventContainer">
      <div
        v-for="propertyName in orderedKeys"
        :key="propertyName"
        :class="{ rectangle: true, active: propertyName === active }"
        @click="activeSet(propertyName)"
        :style="{ width: barWidth(events[propertyName]) }"
      />
    </div>

    <ul class="timelines-years">
      <li
        v-for="(seg, index) in yearSegments"
        :key="seg.year"
        class="timelines-years__cell"
        :class="{ 'timelines-years__cell--last': index === yearSegments.length - 1 }"
        :style="{ flex: seg.months + ' 1 0%' }"
        :aria-label="String(seg.year)"
        :title="index === yearSegments.length - 1 ? String(seg.year) : undefined"
      >
        <span class="timelines-years__label">{{ yearLabel(seg, index) }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Timeline',
  props: {
    events: {
      type: Object,
      default: () => ({})
    },
    /** Chronological keys; falls back to object key order if omitted */
    eventOrder: {
      type: Array,
      default: null
    }
  },
  computed: {
    active () {
      return this.$store.state.active
    },
    orderedKeys () {
      const ev = this.events
      if (!ev || typeof ev !== 'object') return []
      if (this.eventOrder && Array.isArray(this.eventOrder)) {
        return this.eventOrder.filter((k) => Object.prototype.hasOwnProperty.call(ev, k))
      }
      return Object.keys(ev)
    },
    /** Earliest period start and latest period end as month indices (year×12 + month). */
    timelineBounds () {
      const ev = this.events
      if (!ev || typeof ev !== 'object') return { lo: null, hi: null }
      let lo = Infinity
      let hi = -Infinity
      for (const k of Object.keys(ev)) {
        const e = ev[k]
        if (!e || !e.start || !e.end) continue
        const a = this.toMonthIndex(e.start)
        const b = this.toMonthIndex(e.end)
        if (!Number.isFinite(a) || !Number.isFinite(b)) continue
        lo = Math.min(lo, a)
        hi = Math.max(hi, b)
      }
      if (!Number.isFinite(lo) || !Number.isFinite(hi)) return { lo: null, hi: null }
      return { lo, hi }
    },
    /** Inclusive month count across the full [lo, hi] span (matches sum of bar months if contiguous). */
    timelineTotalMonths () {
      const { lo, hi } = this.timelineBounds
      if (lo == null) return 286
      return hi - lo + 1
    },
    /**
     * One column per calendar year that overlaps the data span.
     * flex-grow = months of that year inside [lo, hi], so width matches the bar scale
     * (same denominator as barWidth: partial 2026 is narrower than full years).
     */
    yearSegments () {
      const { lo, hi } = this.timelineBounds
      if (lo == null) return this.fallbackYearSegments()
      const y0 = Math.floor((lo - 1) / 12)
      const y1 = Math.floor((hi - 1) / 12)
      const segments = []
      for (let y = y0; y <= y1; y++) {
        const yearStart = y * 12 + 1
        const yearEnd = y * 12 + 12
        const clipStart = Math.max(lo, yearStart)
        const clipEnd = Math.min(hi, yearEnd)
        const months = clipEnd >= clipStart ? clipEnd - clipStart + 1 : 0
        if (months > 0) {
          segments.push({ year: y, months })
        }
      }
      return segments
    }
  },
  methods: {
    ...mapActions([
      'activeSet'
    ]),
    fallbackYearSegments () {
      const out = []
      for (let y = 1998; y <= 2026; y++) {
        out.push({ year: y, months: 1 })
      }
      return out
    },
    toMonthIndex (date) {
      const parts = this.getAsMonth(date)
      if (!parts || parts.length < 2) return NaN
      const month = parseInt(parts[0], 10)
      const year = parseInt(parts[1], 10)
      if (!Number.isFinite(month) || !Number.isFinite(year)) return NaN
      return year * 12 + month
    },
    barWidth (event) {
      if (!event || !event.start || !event.end) return '0%'
      const total = this.timelineTotalMonths
      const start = this.getAsMonth(event.start)
      const end = this.getAsMonth(event.end)
      if (!start || !end || start.length < 2 || end.length < 2) return '0%'
      const numMonths = (end[1] - start[1]) * 12 + (end[0] - start[0] + 1)
      if (!Number.isFinite(numMonths) || total <= 0) return '0%'
      const perc = (numMonths / total * 100).toFixed(2)
      return perc + '%'
    },
    /** Last column uses 'yy to save width; empty if that slice is very narrow. */
    yearLabel (seg, index) {
      const list = this.yearSegments
      const isLast = index === list.length - 1
      if (!isLast) return String(seg.year)
      if (seg.months < 2) return ''
      return "'" + String(seg.year).slice(-2)
    },
    getAsMonth (date) {
      const arr = date.split('-')
      switch (arr[0]) {
        case 'January':
          arr[0] = 1
          break
        case 'February':
          arr[0] = 2
          break
        case 'March':
          arr[0] = 3
          break
        case 'April':
          arr[0] = 4
          break
        case 'May':
          arr[0] = 5
          break
        case 'June':
          arr[0] = 6
          break
        case 'July':
          arr[0] = 7
          break
        case 'August':
          arr[0] = 8
          break
        case 'September':
          arr[0] = 9
          break
        case 'October':
          arr[0] = 10
          break
        case 'November':
          arr[0] = 11
          break
        case 'December':
          arr[0] = 12
          break
        default:
          return null
      }
      return arr
    }
  }
}
</script>

<style scoped>

#timeContainer {
  height: 10%;
  min-height: 4.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  background: var(--color-chrome, #0f172a);
  border-top: 1px solid rgba(148, 163, 184, 0.12);
}

.rectangle {
  background: linear-gradient(180deg, #475569 0%, #334155 100%);
  cursor: pointer;
  min-height: 6px;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
}

.rectangle:hover {
  filter: brightness(1.12);
}

.rectangle:active {
  transform: scaleY(0.96);
}

.active {
  background: linear-gradient(180deg, #38bdf8 0%, var(--color-accent, #0ea5e9) 100%);
  box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.4);
}

#eventContainer {
  display: flex;
  justify-content: center;
  align-items: stretch;
  height: 70%;
  padding: 0.35rem 0.25rem 0;
  box-sizing: border-box;
}

.timelines-years {
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  background-color: var(--color-chrome, #0f172a);
  display: flex;
  justify-content: center;
  align-items: stretch;
  height: 30%;
  min-height: 1.75rem;
  padding: 0;
  margin: 0;
  list-style: none;
  -webkit-padding-start: 0;
}

.timelines-years__cell {
  flex: 1 1 0;
  min-width: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-chrome-muted, #94a3b8);
  font-size: clamp(0.5rem, 0.85vw, 0.6875rem);
  font-weight: 500;
  text-align: center;
  border-right: 1px solid rgba(148, 163, 184, 0.15);
}

.timelines-years__cell--last .timelines-years__label {
  letter-spacing: -0.04em;
}

.timelines-years__label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.timelines-years__cell:last-child {
  border-right: 0;
}

</style>
