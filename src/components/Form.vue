<template>
   <!-- template for the modal component -->
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <h2 class="start-here">Start here</h2>
            <p class="start-lead">
              The page is three columns — left to right, then the strip along the bottom for time.
            </p>
            <div class="column-guide" aria-label="Layout overview">
              <div class="column-guide__cell">
                <span class="column-guide__name">Map</span>
                <span class="column-guide__hint">Place &amp; tabs (Map, Profile, Projects…)</span>
              </div>
              <div class="column-guide__cell">
                <span class="column-guide__name">Story</span>
                <span class="column-guide__hint">What happened in the selected period</span>
              </div>
              <div class="column-guide__cell">
                <span class="column-guide__name">Time</span>
                <span class="column-guide__hint">Timeline &amp; years along the bottom</span>
              </div>
            </div>
            <hr class="modal-divider" aria-hidden="true">
            <div class="instructions">
              Use the left and right keyboard arrow-keys (or the timeline at the bottom)
              to move through time.
            </div>
            <div class="instructions">
              On <strong>Map</strong>, move through time to travel location history. <strong>Profile</strong>
              and <strong>Projects</strong> stay stable if you prefer not to time-travel.
            </div>
            <div class="iconHolder">
              <img src="@/assets/ui/keyboardArrows.png">
            </div>
            <button @click="$emit('close')">
                OK
            </button>
          </div>

        </div>
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'Form',
  mounted () {
    this._onEnter = (e) => {
      if (e.key !== 'Enter') return
      e.preventDefault()
      this.$emit('close')
    }
    document.addEventListener('keydown', this._onEnter)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this._onEnter)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.iconHolder {
  width: 150px;
  height: 100px;
  text-align: center;
  align-self: center;
}

img {
    height: 100%;
    width: 100%;
    text-align: center;
    object-fit: contain;
}

button {
  font-family: var(--font-sans, inherit);
  font-weight: 800;
  font-size: 1rem;
  letter-spacing: 0.02em;
  background: linear-gradient(180deg, #22c55e 0%, #16a34a 48%, #15803d 100%);
  border: 3px solid #14532d;
  color: #f0fdf4;
  padding: 0.95rem 2.35rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: var(--radius-pill, 999px);
  cursor: pointer;
  box-shadow: 0 3px 16px rgba(21, 128, 61, 0.55), 0 1px 0 rgba(255, 255, 255, 0.12) inset;
  transition: transform 0.15s ease, box-shadow 0.2s ease, filter 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 24px rgba(21, 128, 61, 0.72), 0 1px 0 rgba(255, 255, 255, 0.14) inset;
  filter: brightness(1.04);
}

button:active {
  transform: translateY(0);
}

.start-here {
  margin: 0 0 0.35rem;
  font-family: var(--font-display, inherit);
  font-size: clamp(1.25rem, 3.5vw, 1.5rem);
  font-weight: var(--font-heading-weight, 700);
  letter-spacing: -0.02em;
  color: var(--color-ink, #0f172a);
}

.start-lead {
  margin: 0 0 1rem;
  font-size: clamp(0.8125rem, 2vw, 0.9375rem);
  line-height: 1.45;
  color: var(--color-muted, #64748b);
}

.column-guide {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem 0.5rem;
  justify-content: stretch;
  width: 100%;
  text-align: left;
  margin-bottom: 0.35rem;
}

.column-guide__cell {
  flex: 1 1 140px;
  min-width: 0;
  padding: 0.65rem 0.7rem;
  border-radius: var(--radius, 12px);
  background: var(--color-accent-soft, rgba(14, 165, 233, 0.12));
  border: 1px solid var(--color-border, #e2e8f0);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.column-guide__name {
  font-size: 0.8125rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-accent, #0ea5e9);
}

.column-guide__hint {
  font-size: clamp(0.75rem, 1.8vw, 0.8125rem);
  line-height: 1.4;
  color: var(--color-muted, #64748b);
}

.modal-divider {
  border: none;
  border-top: 1px solid var(--color-border, #e2e8f0);
  margin: 0.85rem 0 0.5rem;
  width: 100%;
}

.instructions {
  font-size: clamp(0.9375rem, 2vw, 1.0625rem);
  line-height: 1.55;
  padding-bottom: 0.65rem;
  color: var(--color-muted, #64748b);
}

.instructions strong {
  color: var(--color-ink, #0f172a);
  font-weight: 700;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(4px);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: min(560px, 94vw);
  min-height: 360px;
  margin: 0 auto;
  padding: 1.75rem 1.75rem 1.5rem;
  background-color: var(--color-surface, #fff);
  border-radius: var(--radius, 16px);
  box-shadow: var(--shadow-md, 0 4px 24px rgba(15, 23, 42, 0.12));
  border: 1px solid var(--color-border, #e2e8f0);
  transition: all .3s ease;
  font-family: var(--font-sans, Helvetica, Arial, sans-serif);
}

.modal-header h3 {
  margin-top: 0;
  color: var(--color-accent, #0ea5e9);
}

.modal-body {
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-content: center;
  flex-direction: column;
  text-align: center;
  gap: 0.25rem;
}

.modal-body > .instructions {
  text-align: center;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.05);
  transform: scale(1.05);
}

</style>
