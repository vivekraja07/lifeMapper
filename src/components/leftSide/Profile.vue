<template>
  <div
    id="profile"
    :class="{ 'profile--compact': compact, 'profile--header': header }"
    :role="header ? 'button' : null"
    :tabindex="header ? 0 : null"
    :aria-label="header ? 'Open full profile' : null"
    @click="openFull"
    @keydown.enter.self="openFull"
    @keydown.space.self.prevent="openFull"
  >
      <div class = "logoHolder">
          <img id="vivek" src="@/assets/ui/profile.png" alt="Vivek Raja">
      </div>

      <h1>
        Vivek Raja
        <span v-if="header" class="profile__open-hint" aria-hidden="true">View profile &rsaquo;</span>
      </h1>
      <p v-if="!header" class="profile__fullname">Vivekanand Rajasekar</p>
      <blockquote v-if="!header">
        <p>"Never discount the power of enthusiasm"</p>
      </blockquote>
      <div class = "icons">
        <div v-for="link in socialLinks" :key="link.label" class = "iconHolder">
          <a
            :href="link.href"
            rel="noopener noreferrer"
            target="_blank"
            :title="link.label"
            @click.stop
          >
            <img
              class="socialIcon"
              :class="{ 'socialIcon--vector': link.vector }"
              :src="link.icon"
              :width="link.vector ? 24 : 512"
              :height="link.vector ? 24 : 512"
              :alt="link.label"
            >
          </a>
        </div>
      </div>

  </div>
</template>

<script>
import SOCIAL_LINKS from '@/data/socialLinks'

export default {
  name: 'Profile',
  props: {
    events: Object,
    compact: {
      type: Boolean,
      default: false
    },
    /** One-row strip above the map on wide screens: small round photo, name, tagline, icons. */
    header: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return { socialLinks: SOCIAL_LINKS }
  },
  methods: {
    openFull () {
      if (this.header) this.$store.commit('setProfileOpen', true)
    }
  }
}

</script>

<style scoped>

#profile {
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: auto;
  overflow-x: hidden;
  padding: 0.5rem 1rem 1.5rem;
  box-sizing: border-box;
  background: var(--color-surface, #fff);
  scrollbar-gutter: stable;
}

h1 {
  font-family: var(--font-name, Georgia, serif);
  font-weight: 700;
  font-optical-sizing: auto;
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  letter-spacing: -0.02em;
  color: var(--color-ink, #0f172a);
  margin-top: 0.75rem;
}

.profile__fullname {
  margin: 0.2rem 0 0;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--color-muted, #64748b);
}

blockquote {
  padding: 1rem 1.25rem;
  margin: 1rem auto 0;
  max-width: 28rem;
  border-left: 4px solid var(--color-accent, #0ea5e9);
  background: var(--color-accent-soft, rgba(14, 165, 233, 0.12));
  border-radius: 0 var(--radius, 12px) var(--radius, 12px) 0;
}

blockquote p {
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    font-style: italic;
    font-weight: 500;
    color: var(--color-muted, #64748b);
    line-height: 1.5;
}

.logoHolder {
  width: 100%;
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 0.25rem;
}

#vivek {
  max-width: 100%;
  width: auto;
  height: auto;
  max-height: min(420px, 55vh);
  object-fit: cover;
  border-radius: var(--radius, 12px);
  box-shadow: var(--shadow-md, 0 4px 24px rgba(15, 23, 42, 0.12));
}

.iconHolder {
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.iconHolder a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: var(--radius-pill, 999px);
  background: var(--color-bg, #e8edf3);
  border: 1px solid var(--color-border, #e2e8f0);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.iconHolder a:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.08));
  border-color: var(--color-accent, #0ea5e9);
}

/* High-DPI sources (512px+) scaled down; intrinsic size hints crisp downsampling on retina */
.socialIcon {
  border-radius: 3px;
  border: 0;
  width: 2rem;
  height: 2rem;
  max-width: 100%;
  object-fit: contain;
  display: block;
  flex-shrink: 0;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

/* Vector brand marks (SVG): true transparency, no white matte */
.socialIcon--vector {
  border-radius: 0;
}

.icons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.25rem;
  padding: 0.5rem 0;
}

#profile.profile--compact #vivek {
  max-height: min(220px, 38vh);
}

#profile.profile--header {
  height: auto;
  overflow: visible;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-areas:
    "photo name"
    "photo icons";
  column-gap: 1rem;
  row-gap: 0.15rem;
  align-items: center;
  padding: 0.85rem 1.25rem 0.9rem;
  text-align: left;
  background: var(--color-chrome, #0f172a);
  color: #f8fafc;
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
  scrollbar-gutter: auto;
}

#profile.profile--header {
  cursor: pointer;
  transition: background 0.15s ease;
}

#profile.profile--header:hover {
  background: #16213a;
}

#profile.profile--header:focus {
  outline: none;
}

#profile.profile--header:focus-visible {
  outline: 2px solid var(--color-accent, #0ea5e9);
  outline-offset: -2px;
}

.profile__open-hint {
  font-family: var(--font-sans, system-ui, sans-serif);
  margin-left: 0.6rem;
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-pill, 999px);
  border: 1px solid rgba(248, 250, 252, 0.25);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--color-chrome-muted, #94a3b8);
  vertical-align: middle;
  transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
}

#profile.profile--header:hover .profile__open-hint {
  color: #fff;
  border-color: var(--color-accent, #0ea5e9);
  background: var(--color-accent, #0ea5e9);
}

#profile.profile--header .logoHolder {
  grid-area: photo;
  width: auto;
  padding: 0;
}

#profile.profile--header #vivek {
  display: block;
  width: 5.5rem;
  height: 5.5rem;
  max-height: none;
  border-radius: 50%;
  object-fit: cover;
  object-position: 50% 20%;
  border: 2px solid rgba(248, 250, 252, 0.85);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
}

#profile.profile--header h1 {
  grid-area: name;
  margin: 0;
  font-size: 1.35rem;
  line-height: 1.2;
  color: #f8fafc;
}

#profile.profile--header blockquote {
  grid-area: quote;
  margin: 0;
  padding: 0;
  max-width: none;
  border: 0;
  background: none;
}

#profile.profile--header blockquote p {
  font-size: 0.875rem;
  line-height: 1.35;
  color: var(--color-chrome-muted, #94a3b8);
}

#profile.profile--header .icons {
  grid-area: icons;
  justify-content: flex-start;
  gap: 0.4rem;
  margin: 0.35rem 0 0;
  padding: 0;
}

#profile.profile--header .iconHolder {
  width: auto;
  height: auto;
}

#profile.profile--header .iconHolder a {
  width: 2.1rem;
  height: 2.1rem;
  background: rgba(248, 250, 252, 0.92);
  border-color: rgba(248, 250, 252, 0.25);
}

#profile.profile--header .socialIcon {
  width: 1.3rem;
  height: 1.3rem;
}

#profile.profile--compact blockquote {
  padding: 0.75rem 1rem;
  margin-top: 0.75rem;
}

</style>
