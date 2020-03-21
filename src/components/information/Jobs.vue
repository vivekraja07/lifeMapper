<template>
    <div class = "Jobs">
        <h2 class="sectionTitle">Jobs</h2>
        <div class="Job" v-for="(job, index) in Jobs" :key="index">
            <div class = "logoHolder" v-if="job.icon">
                <img :src="require('@/assets/icons/' + job.icon)"/>
            </div>

            <div class = "summaryInfo" v-if="job.icon">
                <h3 class = "title"> {{job.title}} </h3>
                <h4 class = "name"> {{job.name}} </h4>
                <h5 class = "timeRange"> {{job.range}} </h5>
                <h5 v-if="job.location" class = "location"> {{job.location}} </h5>
            </div>

            <div class = "extraDetails" v-if="job.addDetails">
                <li v-for="point in job.addDetails" :key="point">
                    {{point}}
                </li>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Jobs',
  props: {
    Jobs: Array,
  }
}
</script>

<style scoped>

/* Make sure that padding behaves as expected */
* {box-sizing:border-box}

h3 {
  align-self: center;
}

.Job {
  border-bottom: 1px dashed #bdbdbd;
  padding-top: 20px;
  padding-bottom: 16px;
}

.Job:last-child {
  border-bottom: 0px;
  padding-bottom: 0px;
}

.Job:first-of-type {
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
