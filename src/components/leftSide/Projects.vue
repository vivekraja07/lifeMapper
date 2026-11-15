<template>
  <div id="projects" data-analytics-area="project">
    <article v-for="(project, index) in projects" :key="index" class="project-card">
      <header class="project-card__head">
        <h3 class="project-card__title">
          <router-link
            v-if="project.routerLink"
            class="project-card__link"
            :to="{ name: project.routerLink.name, params: project.routerLink.props }"
          >{{ cleanTitle(project.title) }}<span class="project-card__arrow" aria-hidden="true">↗</span></router-link>
          <a
            v-else-if="project.link"
            class="project-card__link"
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
          >{{ cleanTitle(project.title) }}<span class="project-card__arrow" aria-hidden="true">↗</span></a>
          <template v-else>{{ cleanTitle(project.title) }}</template>
        </h3>
        <p v-if="project.range" class="project-card__range">{{ project.range }}</p>
      </header>

      <ul v-if="project.details && project.details.length" class="project-card__bullets">
        <li v-for="point in project.details" :key="point">{{ point }}</li>
      </ul>

      <footer
        v-if="(project.tags && project.tags.length) || project.github || project.devpost"
        class="project-card__foot"
      >
        <ul v-if="project.tags && project.tags.length" class="project-card__tags">
          <li
            v-for="tag in project.tags"
            :key="tag"
            class="project-card__tag"
            :style="{ backgroundColor: tagColor(tag) }"
          >{{ tag }}</li>
        </ul>
        <div v-if="project.github || project.devpost" class="project-card__actions">
          <a
            v-if="project.github"
            class="project-card__action"
            :href="project.github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="@/assets/ui/github_mark.png" alt="" width="14" height="14">
            Code
          </a>
          <a
            v-if="project.devpost"
            class="project-card__action"
            :href="project.devpost"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="@/assets/social/devpost.svg" alt="" width="14" height="14">
            Devpost
          </a>
        </div>
      </footer>
    </article>
  </div>
</template>

<script>
/** Tag chip colors (the site's original palette), grouped loosely by kind of tech. */
const GREEN = '#16a34a'
const BLUE = '#0284c7'
const ORANGE = '#ea580c'
const RED = '#dc2626'
const PURPLE = '#a21caf'
const TAG_COLORS = {
  'D3.js': GREEN,
  'Vue.js': GREEN,
  'AntHill': GREEN,
  'Flask': BLUE,
  'Selenium WebDriver': BLUE,
  'Pivotal Cloud Foundry': BLUE,
  'Maven': BLUE,
  'React.js': BLUE,
  'SciPy': BLUE,
  'Unity': ORANGE,
  'Apache POI': ORANGE,
  'Node.js': ORANGE,
  'Differential Privacy': ORANGE,
  'SQLite': RED,
  'Java': RED,
  'MariaDB': RED,
  'Jenkins': RED,
  'ESRI': RED,
  'C': PURPLE,
  'VBA': PURPLE,
  'Jasmine': PURPLE,
  'Jest': PURPLE,
  'Python': PURPLE
}

export default {
  name: 'Projects',
  props: {
    projects: Array
  },
  methods: {
    tagColor (tag) {
      return TAG_COLORS[tag] || '#475569'
    },
    /** Some titles carry a manual line break from the data file. */
    cleanTitle (title) {
      return String(title || '').replace(/\s*\n\s*/g, ' ')
    }
  }
}
</script>

<style scoped>
* { box-sizing: border-box; }

#projects {
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  padding: 1rem;
  text-align: left;
  background: #f6f8fb;
  scrollbar-gutter: stable;
}

.project-card {
  padding: 1.1rem 1.25rem 1.15rem;
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius, 12px);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.03);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.project-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.05), 0 8px 20px rgba(15, 23, 42, 0.06);
}

.project-card + .project-card {
  margin-top: 0.85rem;
}

.project-card__title {
  margin: 0;
  font-family: var(--font-sans, system-ui, sans-serif);
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.35;
  letter-spacing: -0.01em;
  color: var(--color-ink, #0f172a);
}

.project-card__link {
  color: inherit;
  text-decoration: none;
  transition: color 0.15s ease;
}

.project-card__link:hover {
  color: var(--color-accent-hover, #0284c7);
}

.project-card__link:focus {
  outline: none;
}

.project-card__link:focus-visible {
  outline: 2px solid var(--color-accent, #0ea5e9);
  outline-offset: 3px;
  border-radius: 2px;
}

.project-card__arrow {
  display: inline-block;
  margin-left: 0.3rem;
  font-size: 0.85em;
  color: var(--color-accent-hover, #0284c7);
}

.project-card__range {
  margin: 0.25rem 0 0;
  font-size: 0.8125rem;
  color: var(--color-muted, #64748b);
}

.project-card__bullets {
  margin: 0.85rem 0 0;
  padding: 0;
  list-style: none;
}

.project-card__bullets li {
  position: relative;
  padding-left: 1.1rem;
  margin-bottom: 0.45rem;
  font-size: 0.9rem;
  line-height: 1.55;
  color: #334155;
}

.project-card__bullets li:last-child {
  margin-bottom: 0;
}

.project-card__bullets li::before {
  content: '';
  position: absolute;
  left: 0.15rem;
  top: 0.62em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent, #0ea5e9);
}

.project-card__foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  margin-top: 0.95rem;
  padding-top: 0.85rem;
  border-top: 1px solid #f1f5f9;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.project-card__tag {
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #fff;
  box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.08));
}

.project-card__actions {
  display: flex;
  gap: 0.4rem;
  margin-left: auto;
}

.project-card__action {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.65rem;
  border-radius: var(--radius-pill, 999px);
  border: 1px solid var(--color-border, #e2e8f0);
  background: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-ink, #0f172a);
  text-decoration: none;
  transition: border-color 0.15s ease;
}

.project-card__action:hover {
  border-color: var(--color-accent, #0ea5e9);
}

.project-card__action img {
  width: 14px;
  height: 14px;
  object-fit: contain;
}
</style>
