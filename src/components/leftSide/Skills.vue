<template>
  <div id="skills">
    <section v-if="info.CLanguages && info.CLanguages.length" class="skills-card">
      <p class="skills-card__label">Technical skills</p>
      <ul class="skill-list">
        <li v-for="skill in info.CLanguages" :key="skill.name" class="skill">
          <div class="skill__row">
            <span class="skill__name">{{ skill.name }}</span>
            <span class="skill__value">{{ skill.skill }}</span>
          </div>
          <div class="skill__track">
            <div class="skill__fill" :style="{ width: skill.skill }"></div>
          </div>
        </li>
      </ul>
    </section>

    <section v-if="info.Languages && info.Languages.length" class="skills-card">
      <p class="skills-card__label">Languages</p>
      <ul class="skill-list skill-list--spoken">
        <li v-for="lang in info.Languages" :key="lang.name" class="skill">
          <div class="skill__row">
            <span class="skill__name">{{ lang.name }}</span>
            <span class="skill__value">{{ lang.skill }}</span>
          </div>
          <div class="skill__track">
            <div class="skill__fill skill__fill--spoken" :style="{ width: lang.skill }"></div>
          </div>
        </li>
      </ul>
    </section>

    <p v-if="!hasAny" class="skills-empty">No skills recorded for this period.</p>
  </div>
</template>

<script>
export default {
  name: 'Skills',
  props: {
    events: Object
  },
  computed: {
    active () {
      return this.$store.state.active
    },
    info () {
      const e = this.events && this.events[this.active]
      return (e && e.info) || {}
    },
    hasAny () {
      return (this.info.CLanguages || []).length > 0 || (this.info.Languages || []).length > 0
    }
  }
}
</script>

<style scoped>
* { box-sizing: border-box; }

#skills {
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  padding: 1rem;
  text-align: left;
  background: #f6f8fb;
  scrollbar-gutter: stable;
}

.skills-card {
  padding: 1.1rem 1.25rem 1.25rem;
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius, 12px);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.03);
}

.skills-card + .skills-card {
  margin-top: 0.85rem;
}

.skills-card__label {
  margin: 0 0 1rem;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--color-muted, #64748b);
}

.skill-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}

.skill__name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-ink, #0f172a);
}

.skill__value {
  flex-shrink: 0;
  font-size: 0.75rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--color-muted, #64748b);
}

.skill__track {
  height: 6px;
  border-radius: var(--radius-pill, 999px);
  background: #eef2f7;
  overflow: hidden;
}

.skill__fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--color-accent, #0ea5e9), #6366f1);
  transition: width 0.4s ease;
}

.skill__fill--spoken {
  background: linear-gradient(90deg, #14b8a6, #10b981);
}

.skills-empty {
  margin: 1rem 0;
  font-size: 0.875rem;
  color: var(--color-muted, #64748b);
  text-align: center;
}

/* Narrow containers (phone fold-out): one column */
@media (max-width: 1023px) {
  .skill-list {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
