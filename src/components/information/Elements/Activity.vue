<template>
    <div>
        <IconHolder v-bind:icon="activity.icon" />

        <div class = "summaryInfo" v-if="activity.icon">
            <h3 class="title">
              <a
                v-if="activity.link"
                :href="activity.link"
                class="title-link"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="activity.title + ' (opens in new tab)'"
              >
                <span class="title-link__text">{{ activity.title }}</span>
                <img
                  class="title-link__icon"
                  src="@/assets/ui/external.png"
                  alt=""
                  width="14"
                  height="14"
                >
              </a>
              <template v-else>{{ activity.title }}</template>
            </h3>
            <h4 class = "name"> {{activity.name}} </h4>
            <h5 class = "timeRange"> {{activity.range}} </h5>
            <h5 v-if="activity.location" class = "location"> {{activity.location}} </h5>
        </div>

        <div class="addDetails" v-if="activity.courses || activity.details">

            <div v-if="activity.courses" class="addDetails-table">
                <Table v-bind:Table="activity.courses" />
            </div>

            <ul v-if="activity.details && activity.details.length" class="addDetails-bullets">
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
  },
  components: {
      IconHolder,
      Table
  }
}
</script>

<style scoped>

.summaryInfo {
    margin-left: 80px;
}

.addDetails {
    clear: left;
    margin-top: 0.75rem;
    color: var(--color-ink, #0f172a);
}

.addDetails-table {
    margin-left: 0;
}

.addDetails-bullets {
    margin: 0;
    padding-left: 1rem;
    list-style-position: outside;
}

.addDetails-table + .addDetails-bullets {
    margin-top: 0.65rem;
}

.addDetails-bullets li {
  margin-bottom: 0.22rem;
  padding-left: 0;
  line-height: 1.38;
  font-size: 0.9375rem;
}

.title {
  font-family: var(--font-display, system-ui, sans-serif);
  font-weight: var(--font-heading-weight, 700);
  font-size: 1.0625rem;
  letter-spacing: -0.02em;
  color: var(--color-ink, #0f172a);
  margin-bottom: 0.25rem;
}

.title-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  max-width: 100%;
  color: var(--color-accent, #0ea5e9);
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 0.2em;
  font-weight: inherit;
  transition: color 0.15s ease, filter 0.15s ease;
}

.title-link:hover {
  color: #0284c7;
  filter: brightness(1.05);
}

.title-link:focus {
  outline: none;
}

.title-link:focus-visible {
  outline: 2px solid var(--color-accent, #0ea5e9);
  outline-offset: 3px;
  border-radius: 2px;
}

.title-link__text {
  min-width: 0;
}

.title-link__icon {
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  vertical-align: middle;
  opacity: 0.9;
}

.name {
  font-weight: 600;
  font-size: 0.9375rem;
  color: var(--color-muted, #64748b);
  margin-bottom: 0.2rem;
}

.timeRange, .location {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-muted, #64748b);
}

</style>

