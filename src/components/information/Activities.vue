<template>
    <div class="Activities">
        <h2 v-if="sectionTitle" class="sectionTitle">{{sectionTitle}}</h2>
        <Activity class="Activity" v-for="(activity, index) in activities" :key="index" v-bind:activity="activity" :link-on="linkOn"/>

    </div>
</template>

<script>
import IconHolder from '@/components/information/Elements/IconHolder.vue'
import Activity from '@/components/information/Elements/Activity.vue'

export default {
  name: 'Activities',
  props: {
    activities: Array,
    sectionTitle: String,
    linkOn: {
      type: String,
      default: 'title'
    }
  },
  components: {
    IconHolder,
    Activity
  }
}
</script>

<style scoped>
* { box-sizing: border-box; }

.Activity + .Activity {
  margin-top: 1.1rem;
  padding-top: 1.1rem;
  border-top: 1px solid var(--color-border, #e2e8f0);
}

.sectionTitle {
  margin: 0 0 0.85rem;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--color-muted, #64748b);
}
</style>
