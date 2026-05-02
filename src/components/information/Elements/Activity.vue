<template>
    <div>
        <IconHolder v-bind:icon="activity.icon" />

        <div class = "summaryInfo" v-if="activity.icon">
            <h3 class = "title"> {{activity.title}} </h3>
            <h4 class = "name"> {{activity.name}} </h4>
            <h5 class = "timeRange"> {{activity.range}} </h5>
            <h5 v-if="activity.location" class = "location"> {{activity.location}} </h5>
        </div>

        <div class = "addDetails" v-if="activity.courses || activity.details">

            <Table v-if="activity.courses" v-bind:Table="activity.courses" />

            <li v-for="point in activity.details" :key="point">
                {{point}}
            </li>
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
    margin-left: 80px;
    margin-top: 1rem;
    color: var(--color-ink, #0f172a);
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

.addDetails li {
  margin-bottom: 0.5rem;
  padding-left: 0.25rem;
  line-height: 1.55;
}

</style>

