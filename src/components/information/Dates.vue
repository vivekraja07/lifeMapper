<template>
    <div class="dates" :class="{ 'dates--fluid': fluidHeight }">
        <button
            type="button"
            class="nav-btn nav-btn--prev"
            :disabled="!canGoPrev"
            aria-label="Previous time period"
            @click="getPrev"
        >
            <span class="nav-btn__icon" aria-hidden="true">&#8249;</span>
        </button>
        <h3 id="date">{{active}}</h3>
        <button
            type="button"
            class="nav-btn nav-btn--next"
            :disabled="!canGoNext"
            aria-label="Next time period"
            @click="getNext"
        >
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
      _lastArrowRepeatNav: 0
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
      'activeSet',
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
      if (e.repeat) {
        const now = Date.now()
        if (now - this._lastArrowRepeatNav < 140) return
        this._lastArrowRepeatNav = now
      } else {
        this._lastArrowRepeatNav = 0
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
      gtag('event','click',{'event_category':'navigation','event_label':'left'});
    },
    getPrev () {
      if (!this.canGoPrev) return
      this.activeSet(this.eventOrder[this.activeIndex - 1])
      gtag('event','click',{'event_category':'navigation','event_label':'right'});
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

h3 {
  flex: 1;
  min-width: 0;
  margin: 0;
  padding: 0 0.5rem;
  align-self: center;
  font-family: var(--font-display, system-ui, sans-serif);
  font-weight: var(--font-heading-weight, 700);
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  letter-spacing: -0.02em;
  color: #f8fafc;
}

.nav-btn {
  flex-shrink: 0;
  align-self: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  margin: 0;
  padding: 0;
  border-radius: var(--radius-pill, 999px);
  border: 1px solid rgba(248, 250, 252, 0.28);
  background: rgba(255, 255, 255, 0.08);
  color: #f8fafc;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  cursor: pointer;
  transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease,
    box-shadow 0.15s ease, transform 0.1s ease;
}

.nav-btn__icon {
  display: block;
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1;
  margin-top: -0.05em;
}

.nav-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.16);
  border-color: rgba(248, 250, 252, 0.45);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.nav-btn:active:not(:disabled) {
  transform: scale(0.96);
}

.nav-btn:focus {
  outline: none;
}

.nav-btn:focus-visible {
  outline: 2px solid var(--color-accent, #0ea5e9);
  outline-offset: 2px;
}

.nav-btn:disabled {
  opacity: 0.38;
  cursor: not-allowed;
  border-color: rgba(248, 250, 252, 0.12);
  background: rgba(255, 255, 255, 0.03);
  box-shadow: none;
}

.dates.dates--fluid {
  height: auto;
  flex-shrink: 0;
}

</style>
