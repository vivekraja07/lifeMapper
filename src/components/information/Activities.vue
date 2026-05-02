<template>
    <div class="Activities">
        
        <h2 class="sectionTitle">{{sectionTitle}}</h2>
        
        <Activity class="Activity" v-for="(activity, index) in activities" :key="index" v-bind:activity="activity"/>

    </div>
</template>

<script>
import IconHolder from '@/components/information/Elements/IconHolder.vue'
import Activity from '@/components/information/Elements/Activity.vue'

export default {
  name: 'Activities',
  props: {
    activities: Array,
    sectionTitle: String
  },
  components: {
    IconHolder,
    Activity
  }
}
</script>

<style scoped>
/* Make sure that padding behaves as expected */
* {box-sizing:border-box}

.Activity {
  border-bottom: var(--border-section-width, 3px) solid var(--color-border, #e2e8f0);
  padding-top: 1.25rem;
  padding-bottom: 1rem;
}

.Activity:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.Activity:first-of-type {
  padding-top: 0;
}

.sectionTitle {
    font-family: var(--font-display, system-ui, sans-serif);
    font-weight: var(--font-heading-weight, 700);
    font-size: 1.125rem;
    letter-spacing: -0.02em;
    text-align: center;
    color: var(--color-ink, #0f172a);
    margin-bottom: 0.75rem;
}

</style>
