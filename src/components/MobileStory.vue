<template>
  <div class="mobile-story">
    <p class="mobile-story__hint">
      Readable layout for phones and tablets. On a wide screen you get the full map, profile tabs, and timeline strip.
    </p>

    <header class="mobile-story__sticky">
      <Dates :event-order="eventOrder" :fluid-height="true" />
      <div
        class="mobile-story__chips"
        role="tablist"
        aria-label="Jump to a life period"
      >
        <button
          v-for="key in orderedKeys"
          :id="'chip-' + chipId(key)"
          :key="key"
          type="button"
          role="tab"
          :aria-selected="key === active ? 'true' : 'false'"
          class="chip"
          :class="{ 'chip--active': key === active }"
          :title="key"
          @click="onChip(key)"
        >
          {{ chipLabel(key) }}
        </button>
      </div>
    </header>

    <main class="mobile-story__main">
      <Information
        :events="events"
        :event-order="eventOrder"
        stacked
      />
      <section class="mobile-story__about" aria-labelledby="mobile-about-heading">
        <h2 id="mobile-about-heading" class="mobile-story__about-heading">
          About
        </h2>
        <Profile compact />
        <a
          class="mobile-story__resume"
          href="https://drive.google.com/file/d/1Xso5gpHvsvbeGZd_-zciS7CMfFj9mw4t/view?usp=drive_link"
          rel="noopener noreferrer"
          target="_blank"
        >
          Résumé (PDF)
        </a>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Dates from '@/components/information/Dates.vue'
import Information from '@/components/information/Information.vue'
import Profile from '@/components/leftSide/Profile.vue'

export default {
  name: 'MobileStory',
  components: {
    Dates,
    Information,
    Profile
  },
  props: {
    events: {
      type: Object,
      required: true
    },
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
    }
  },
  watch: {
    active () {
      this.$nextTick(() => this.scrollActiveChipIntoView())
    }
  },
  mounted () {
    this.$nextTick(() => this.scrollActiveChipIntoView())
  },
  methods: {
    ...mapActions(['activeSet']),
    chipId (key) {
      return String(key).replace(/\W+/g, '-').slice(0, 48)
    },
    chipLabel (key) {
      const years = key.match(/\d{4}/g) || []
      if (years.length >= 2) {
        const a = years[0]
        const b = years[years.length - 1]
        return a === b ? a : `${a}–${b}`
      }
      if (years.length === 1) {
        return key.includes('Present') ? `${years[0]}–` : years[0]
      }
      return key.length > 16 ? `${key.slice(0, 14)}…` : key
    },
    onChip (key) {
      this.activeSet(key)
    },
    scrollActiveChipIntoView () {
      const id = 'chip-' + this.chipId(this.active)
      const el = typeof document !== 'undefined' ? document.getElementById(id) : null
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
      }
    }
  }
}
</script>

<style scoped>
.mobile-story {
  min-height: 100%;
  box-sizing: border-box;
  padding-bottom: 2.5rem;
  text-align: left;
  font-size: 1rem;
  background: var(--color-bg, #e8edf3);
}

.mobile-story__hint {
  margin: 0;
  padding: 0.85rem 1rem 0.65rem;
  font-size: 0.8125rem;
  line-height: 1.45;
  color: var(--color-muted, #64748b);
  text-align: center;
  border-bottom: 1px solid var(--color-border, #e2e8f0);
  background: rgba(255, 255, 255, 0.45);
}

.mobile-story__sticky {
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
}

.mobile-story__chips {
  display: flex;
  gap: 0.4rem;
  padding: 0.5rem 0.65rem 0.65rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity;
  background: var(--color-chrome, #0f172a);
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
}

.mobile-story__chips::-webkit-scrollbar {
  height: 6px;
}

.mobile-story__chips::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.35);
  border-radius: 999px;
}

.chip {
  flex: 0 0 auto;
  scroll-snap-align: start;
  margin: 0;
  padding: 0.4rem 0.65rem;
  border-radius: var(--radius-pill, 999px);
  border: 1px solid rgba(248, 250, 252, 0.22);
  background: rgba(255, 255, 255, 0.08);
  color: #e2e8f0;
  font-family: var(--font-sans, system-ui, sans-serif);
  font-size: 0.75rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
  cursor: pointer;
  max-width: 8.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.chip:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(248, 250, 252, 0.35);
}

.chip:focus {
  outline: none;
}

.chip:focus-visible {
  outline: 2px solid var(--color-accent, #0ea5e9);
  outline-offset: 2px;
}

.chip--active {
  color: #0f172a;
  background: #f8fafc;
  border-color: rgba(255, 255, 255, 0.45);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.mobile-story__main {
  max-width: 36rem;
  margin: 0 auto;
}

.mobile-story__about {
  margin-top: 0.5rem;
  padding: 1.25rem 1rem 2rem;
  background: var(--color-surface, #fff);
  border-top: 1px solid var(--color-border, #e2e8f0);
}

.mobile-story__about-heading {
  margin: 0 0 1rem;
  font-family: var(--font-display, system-ui, sans-serif);
  font-weight: var(--font-heading-weight, 700);
  font-size: 1.125rem;
  letter-spacing: -0.02em;
  color: var(--color-ink, #0f172a);
  text-align: center;
}

.mobile-story__resume {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto 0;
  max-width: 16rem;
  padding: 0.65rem 1.25rem;
  border-radius: var(--radius-pill, 999px);
  font-weight: 700;
  font-size: 0.9375rem;
  text-decoration: none;
  color: #fff;
  background: linear-gradient(135deg, var(--color-accent, #0ea5e9), var(--color-accent-hover, #0284c7));
  box-shadow: 0 2px 12px rgba(14, 165, 233, 0.35);
  transition: transform 0.12s ease, box-shadow 0.15s ease;
}

.mobile-story__resume:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(14, 165, 233, 0.45);
}

.mobile-story__resume:active {
  transform: translateY(0);
}
</style>
