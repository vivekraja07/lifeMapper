<template>
    <div>
        <IconHolder v-bind:icon="activity.icon" />

        <div class = "summaryInfo" v-if="activity.icon">
            <h3 class = "title"> {{activity.title}} </h3>
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

