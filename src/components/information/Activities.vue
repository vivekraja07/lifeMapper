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
  border-bottom: 1px dashed #bdbdbd;
  padding-top: 20px;
  padding-bottom: 16px;
}

.Activity:last-child {
  border-bottom: 0px;
  padding-bottom: 0px;
}

.Activity:first-of-type {
  padding-top: 0px;
}

.sectionTitle {
    text-align: center;
}

</style>
