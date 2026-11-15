<template>
    <div class="dates" :class="{ 'dates--fluid': fluidHeight }">
        <button
            type="button"
            class="nav-btn nav-btn--prev"
            :disabled="!canGoPrev"
            aria-label="Previous time period"
            title="Earlier (← key)"
            @click="getPrev"
        >
            <span class="nav-btn__icon" aria-hidden="true">&#8249;</span>
            <span class="nav-btn__label">Earlier</span>
        </button>
        <div class="dates__center">
            <h3 id="date">{{active}}</h3>
        </div>
        <button
            type="button"
            class="nav-btn nav-btn--next"
            :disabled="!canGoNext"
            aria-label="Next time period"
            title="Later (→ key)"
            @click="getNext"
        >
            <span class="nav-btn__label">Later</span>
            <span class="nav-btn__icon" aria-hidden="true">&#8250;</span>
        </button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Dates',
  props: {
    eventOrder: Array,
    /** Use when the bar is not inside a fixed % height column (e.g. mobile sticky header). */
    fluidHeight: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      lastArrowRepeatNav: 0
    }
  },
  created () {
    this._onWindowKeydown = this._onWindowKeydown.bind(this)
    window.addEventListener('keydown', this._onWindowKeydown)
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this._onWindowKeydown)
  },
  computed: {
    active () {
      return this.$store.state.active
    },
    activeIndex () {
      if (!this.eventOrder || !this.eventOrder.length) return -1
      return this.eventOrder.indexOf(this.active)
    },
    canGoPrev () {
      return this.activeIndex > 0
    },
    canGoNext () {
      const n = this.eventOrder ? this.eventOrder.length : 0
      return this.activeIndex >= 0 && this.activeIndex < n - 1
    }
  },
  methods: {
    ...mapActions([
      'activeSet'
    ]),
    _isEditableTarget (el) {
      if (!el || typeof el.closest !== 'function') return false
      const tag = (el.tagName || '').toUpperCase()
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
      if (el.isContentEditable) return true
      return !!el.closest('[contenteditable="true"]')
    },
    _onWindowKeydown (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      if (this._isEditableTarget(e.target)) return
      if (this.$store.state.profileOpen) return
      if (e.repeat) {
        const now = Date.now()
        if (now - this.lastArrowRepeatNav < 140) return
        this.lastArrowRepeatNav = now
      } else {
        this.lastArrowRepeatNav = 0
      }
      e.preventDefault()
      if (e.key === 'ArrowLeft') {
        this.getPrev()
      } else {
        this.getNext()
      }
    },
    getNext () {
      if (!this.canGoNext) return
      this.activeSet(this.eventOrder[this.activeIndex + 1])
      this._track('left')
    },
    getPrev () {
      if (!this.canGoPrev) return
      this.activeSet(this.eventOrder[this.activeIndex - 1])
      this._track('right')
    },
    _track (label) {
      // gtag only exists when analytics loaded (not on the dev server)
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'click', { event_category: 'navigation', event_label: label })
      }
    }
  }
}
</script>

<style scoped>
/* Make sure that padding behaves as expected */
* {box-sizing:border-box}

.dates {
    background: var(--color-chrome, #0f172a);
    color: #f8fafc;
    border: 0;
    flex: 0 0 auto;
    height: 10%;
    min-height: 3.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    text-align: center;
    padding: 0 0.5rem;
    border-bottom: 1px solid rgba(148, 163, 184, 0.15);
}

.dates__center {
  flex: 1;
  min-width: 0;
  padding: 0 0.5rem;
}

h3 {
  margin: 0;
  font-family: var(--font-display, system-ui, sans-serif);
  font-weight: var(--font-heading-weight, 700);
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  letter-spacing: -0.02em;
  color: #f8fafc;
}

/* Prominent, filled accent pills so time navigation reads as the primary control. */
.nav-btn {
  flex-shrink: 0;
  align-self: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  height: 2.6rem;
  min-width: 2.6rem;
  margin: 0;
  padding: 0 1rem;
  border-radius: var(--radius-pill, 999px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: linear-gradient(135deg, var(--color-accent, #0ea5e9), var(--color-accent-hover, #0284c7));
  color: #fff;
  font-family: var(--font-sans, inherit);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  box-shadow: 0 2px 10px rgba(14, 165, 233, 0.4);
  cursor: pointer;
  transition: background 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease, opacity 0.15s ease;
}

.nav-btn--prev {
  padding-left: 0.75rem;
}

.nav-btn--next {
  padding-right: 0.75rem;
}

.nav-btn__icon {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  margin-top: -0.1em;
}

.nav-btn:hover:not(:disabled) {
  box-shadow: 0 4px 16px rgba(14, 165, 233, 0.55);
  transform: translateY(-1px);
}

.nav-btn:active:not(:disabled) {
  transform: translateY(0) scale(0.97);
}

.nav-btn:focus {
  outline: none;
}

.nav-btn:focus-visible {
  outline: 2px solid #f8fafc;
  outline-offset: 2px;
}

.nav-btn:disabled {
  cursor: not-allowed;
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(248, 250, 252, 0.12);
  color: rgba(248, 250, 252, 0.35);
  box-shadow: none;
}

/* Narrow bars (phones): arrows only. */
@media (max-width: 600px) {
  .nav-btn__label {
    display: none;
  }

  .nav-btn,
  .nav-btn--prev,
  .nav-btn--next {
    padding: 0;
    width: 2.75rem;
  }
}

.dates.dates--fluid {
  height: auto;
  flex-shrink: 0;
}

</style>
