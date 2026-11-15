<template>
    <div class="item">
        <div class="item__head" data-analytics-area="activity">
            <IconHolder v-if="activity.icon" v-bind:icon="activity.icon" :label="orgName" />

            <div class="item__summary">
                <h3 class="item__title">
                  <a
                    v-if="activity.link && linkOn === 'title'"
                    :href="activity.link"
                    class="item__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="activity.title + ' (opens in new tab)'"
                  >{{ activity.title }}<span class="item__link-arrow" aria-hidden="true">↗</span></a>
                  <template v-else>{{ activity.title }}</template>
                </h3>
                <p v-if="activity.name" class="item__org">
                  <a
                    v-if="activity.link && linkOn === 'name'"
                    :href="activity.link"
                    class="item__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="activity.name + ' (opens in new tab)'"
                  >{{ activity.name }}<span class="item__link-arrow" aria-hidden="true">↗</span></a>
                  <template v-else>{{ activity.name }}</template>
                </p>
                <p v-if="activity.range || activity.location" class="item__meta">
                  <span v-if="activity.range">{{ activity.range }}</span>
                  <span v-if="activity.range && activity.location" class="item__dot" aria-hidden="true">·</span>
                  <span v-if="activity.location">{{ activity.location }}</span>
                </p>
            </div>
        </div>

        <div class="item__body" v-if="activity.courses || (activity.details && activity.details.length)">
            <Table v-if="activity.courses" v-bind:Table="activity.courses" />

            <ul v-if="activity.details && activity.details.length" class="item__bullets">
                <li v-for="point in activity.details" :key="point">
                    {{point}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import IconHolder from '@/components/information/Elements/IconHolder.vue'
import Table from '@/components/information/Elements/Table.vue'

export default {
  name: 'Activity',
  props: {
    activity: Object,
    /** Which line carries `activity.link`: 'title' (orgs in Activities) or 'name' (company line on Jobs). */
    linkOn: {
      type: String,
      default: 'title'
    }
  },
  components: {
    IconHolder,
    Table
  },
  computed: {
    /** Jobs keep the company in `name`; schools and activities keep the org in `title`. */
    orgName () {
      const a = this.activity || {}
      return (this.linkOn === 'name' ? a.name : a.title) || ''
    }
  }
}
</script>

<style scoped>
* { box-sizing: border-box; }

.item__head {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
}

.item__summary {
  flex: 1 1 auto;
  min-width: 0;
}

.item__title {
  margin: 0;
  font-family: var(--font-sans, system-ui, sans-serif);
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--color-ink, #0f172a);
}

.item__org {
  margin: 0.15rem 0 0;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.35;
  color: #334155;
}

.item__meta {
  margin: 0.25rem 0 0;
  font-size: 0.8125rem;
  line-height: 1.4;
  color: var(--color-muted, #64748b);
}

.item__dot {
  margin: 0 0.35rem;
}

.item__link {
  color: var(--color-accent-hover, #0284c7);
  text-decoration: none;
  border-bottom: 1px solid rgba(2, 132, 199, 0.35);
  transition: color 0.15s ease, border-color 0.15s ease;
}

.item__link:hover {
  color: #0369a1;
  border-bottom-color: currentColor;
}

.item__link:focus {
  outline: none;
}

.item__link:focus-visible {
  outline: 2px solid var(--color-accent, #0ea5e9);
  outline-offset: 3px;
  border-radius: 2px;
}

.item__link-arrow {
  display: inline-block;
  margin-left: 0.2rem;
  font-size: 0.85em;
}

.item__body {
  margin-top: 0.9rem;
}

.item__bullets {
  margin: 0;
  padding: 0;
  list-style: none;
}

.item__body > * + .item__bullets {
  margin-top: 0.75rem;
}

.item__bullets li {
  position: relative;
  padding-left: 1.1rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.55;
  color: #334155;
}

.item__bullets li:last-child {
  margin-bottom: 0;
}

.item__bullets li::before {
  content: '';
  position: absolute;
  left: 0.15rem;
  top: 0.62em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent, #0ea5e9);
}
</style>
