<template>
  <transition name="profile-view">
    <div
      v-if="open"
      class="profile-view"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-view-name"
    >
      <header class="profile-view__bar">
        <button
          ref="back"
          type="button"
          class="profile-view__back"
          @click="close"
        >
          <span aria-hidden="true">&larr;</span>
          Back to map
        </button>
        <span class="profile-view__bar-hint">Esc to close</span>
      </header>

      <div class="profile-view__scroll">
        <section class="profile-view__hero">
          <img
            class="profile-view__photo"
            src="@/assets/ui/profile.png"
            alt="Vivek Raja"
          >

          <div class="profile-view__intro">
            <h1 id="profile-view-name" class="profile-view__name">Vivek Raja</h1>
            <p class="profile-view__fullname">Vivekanand Rajasekar</p>
            <p class="profile-view__tagline">"Never discount the power of enthusiasm"</p>

            <div v-if="currentJob" class="profile-view__now">
              <span class="profile-view__eyebrow">Currently</span>
              <div class="profile-view__now-row">
                <img
                  v-if="currentJob.icon"
                  class="profile-view__now-logo"
                  :src="iconSrc(currentJob.icon)"
                  :alt="currentJob.name"
                >
                <div>
                  <p class="profile-view__now-title">{{ currentJob.title }}</p>
                  <p class="profile-view__now-org">
                    <a
                      v-if="currentJob.link"
                      :href="currentJob.link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >{{ currentJob.name }}</a>
                    <template v-else>{{ currentJob.name }}</template>
                  </p>
                  <p v-if="currentPlace" class="profile-view__now-place">{{ currentPlace }}</p>
                </div>
              </div>
            </div>

            <div class="profile-view__links">
              <a
                v-for="link in socialLinks"
                :key="link.label"
                class="profile-view__link"
                :class="{ 'profile-view__link--primary': link.label === 'Resume' }"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                :title="link.label === 'Resume' ? 'Résumé' : link.label"
                :aria-label="link.label === 'Resume' ? 'Résumé' : link.label"
              >
                <img :src="link.icon" alt="" width="22" height="22">
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import SOCIAL_LINKS from '@/data/socialLinks'

export default {
  name: 'ProfileView',
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
  data () {
    return { socialLinks: SOCIAL_LINKS }
  },
  computed: {
    open () {
      return this.$store.state.profileOpen
    },
    orderedKeys () {
      const ev = this.events || {}
      if (Array.isArray(this.eventOrder)) {
        return this.eventOrder.filter((k) => Object.prototype.hasOwnProperty.call(ev, k))
      }
      return Object.keys(ev)
    },
    latest () {
      const k = this.orderedKeys[this.orderedKeys.length - 1]
      return k ? this.events[k] : null
    },
    currentJob () {
      const jobs = this.latest && this.latest.info && this.latest.info.Jobs
      return Array.isArray(jobs) && jobs.length ? jobs[0] : null
    },
    currentPlace () {
      const g = this.latest && this.latest.info && this.latest.info.General
      return g ? g.Location : ''
    }
  },
  watch: {
    open (isOpen) {
      if (isOpen) {
        document.addEventListener('keydown', this.onKeydown)
        this.$nextTick(() => this.$refs.back && this.$refs.back.focus())
      } else {
        document.removeEventListener('keydown', this.onKeydown)
      }
    }
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.onKeydown)
  },
  methods: {
    iconSrc (name) {
      try {
        return require('@/assets/icons/' + name)
      } catch (e) {
        return ''
      }
    },
    close () {
      this.$store.commit('setProfileOpen', false)
    },
    onKeydown (e) {
      if (e.key === 'Escape') this.close()
    }
  }
}
</script>

<style scoped>
* { box-sizing: border-box; }

.profile-view {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  text-align: left;
  background: var(--color-bg, #e8edf3);
}

.profile-view__bar {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  background: var(--color-chrome, #0f172a);
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
}

.profile-view__back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  height: 2.6rem;
  padding: 0 1.1rem 0 0.9rem;
  border-radius: var(--radius-pill, 999px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: linear-gradient(135deg, var(--color-accent, #0ea5e9), var(--color-accent-hover, #0284c7));
  color: #fff;
  font-family: var(--font-sans, inherit);
  font-size: 0.9375rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(14, 165, 233, 0.4);
  transition: transform 0.1s ease, box-shadow 0.15s ease;
}

.profile-view__back span {
  font-size: 1.15rem;
  line-height: 1;
}

.profile-view__back:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(14, 165, 233, 0.55);
}

.profile-view__back:focus {
  outline: none;
}

.profile-view__back:focus-visible {
  outline: 2px solid #f8fafc;
  outline-offset: 2px;
}

.profile-view__bar-hint {
  font-size: 0.8125rem;
  color: var(--color-chrome-muted, #94a3b8);
}

.profile-view__scroll {
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
  padding: 2.5rem 1.5rem 3rem;
  display: flex;
}

/* margin:auto centers in both axes but still scrolls (no clipping) on short windows */
.profile-view__hero {
  width: 100%;
  max-width: 64rem;
  margin: auto;
  display: grid;
  grid-template-columns: minmax(14rem, 22rem) minmax(0, 1fr);
  gap: 2.5rem;
  align-items: center;
}

.profile-view__photo {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: 50% 25%;
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.18);
}

.profile-view__name {
  margin: 0;
  font-family: var(--font-name, Georgia, serif);
  font-weight: 700;
  font-optical-sizing: auto;
  font-size: clamp(2.75rem, 5vw, 4rem);
  letter-spacing: -0.02em;
  line-height: 1.05;
  color: var(--color-ink, #0f172a);
}

.profile-view__fullname {
  margin: 0.35rem 0 0;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-muted, #64748b);
}

.profile-view__tagline {
  margin: 0.6rem 0 0;
  font-size: 1.125rem;
  font-style: italic;
  color: var(--color-muted, #64748b);
}

.profile-view__now {
  margin-top: 1.5rem;
  padding: 1rem 1.25rem;
  border-radius: var(--radius, 12px);
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e2e8f0);
  box-shadow: var(--shadow-sm, 0 1px 2px rgba(15, 23, 42, 0.06));
}

.profile-view__eyebrow {
  display: block;
  margin-bottom: 0.6rem;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent-hover, #0284c7);
}

.profile-view__now-row {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.profile-view__now-logo {
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 10px;
  object-fit: contain;
  border: 1px solid var(--color-border, #e2e8f0);
  background: #fff;
}

.profile-view__now-row p {
  margin: 0;
}

.profile-view__now-title {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--color-ink, #0f172a);
}

.profile-view__now-org {
  font-weight: 600;
  color: var(--color-ink, #0f172a);
}

.profile-view__now-org a {
  color: var(--color-accent-hover, #0284c7);
  text-decoration: none;
}

.profile-view__now-org a:hover {
  text-decoration: underline;
}

.profile-view__now-place {
  font-size: 0.875rem;
  color: var(--color-muted, #64748b);
}

.profile-view__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.25rem;
}

.profile-view__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border-radius: var(--radius-pill, 999px);
  border: 1px solid var(--color-border, #e2e8f0);
  background: var(--color-surface, #fff);
  color: var(--color-ink, #0f172a);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: border-color 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease;
}

.profile-view__link img {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

.profile-view__link:hover {
  border-color: var(--color-accent, #0ea5e9);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm, 0 1px 2px rgba(15, 23, 42, 0.06));
}

.profile-view__link--primary {
  color: #fff;
  border-color: transparent;
  background: linear-gradient(135deg, var(--color-accent, #0ea5e9), var(--color-accent-hover, #0284c7));
}

.profile-view__link--primary img {
  filter: brightness(0) invert(1);
}

.profile-view-enter-active,
.profile-view-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.profile-view-enter,
.profile-view-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

@media (max-width: 1100px) {
  .profile-view__hero {
    grid-template-columns: minmax(12rem, 16rem) minmax(0, 1fr);
    gap: 1.75rem;
  }
}
</style>
