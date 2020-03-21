<template>
    <div class="Activities">
        <h2 class="sectionTitle">Activities</h2>
        <div class="Activity" v-for="activity in activities" :key="activity.name">
            <div class = "logoHolder">
                <img :src="require('@/assets/icons/' + activity.icon)"/>
            </div>

            <div class = "summaryInfo">
                <h3 class = "title"> {{activity.title}} </h3>
                <h4 class = "name"> {{activity.name}} </h4>
                <h5 class = "timeRange"> {{activity.range}} </h5>
            </div>

            <div class = "extraDetails">
                <li v-for="point in activity.details" :key="point">
                    {{point}}
                </li>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Activities',
  props: {
    activities: Array,
  }
}
</script>

<style scoped>
/* Make sure that padding behaves as expected */
* {box-sizing:border-box}

h3 {
  align-self: center;
}

.round {
  align-self: center;
}

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

/* logo icon styles go here */

.logoHolder {
  width: 72px;
  height: 72px;
  float: left;
}

.imageHolder {
  border-radius: 6px;
  height: 56px;
  width: 56px;
  background-size: contain;
}

img {
    border-radius: 6px;
    border: 4px solid transparent;
    height: 64px;
    width: 64px;
}

.summaryInfo {
    margin-left: 80px;
}

.extraDetails {
    margin-left: 80px;
    margin-top: 16px;
}

</style>
