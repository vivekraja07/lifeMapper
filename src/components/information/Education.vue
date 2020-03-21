<template>
    <div class = "School">
        <div class = "logoHolder">
            <img :src="require('@/assets/icons/' + School.icon)"/>
        </div>

        <div class = "summaryInfo" v-if="School.icon">
            <h3 class = "title"> {{School.title}} </h3>
            <h4 class = "name"> {{School.name}} </h4>
            <h5 class = "timeRange"> {{School.range}} </h5>
            <h5 v-if="School.location" class = "location"> {{School.location}} </h5>
        </div>

        <div class = "extraDetails" v-if="School.courses || School.addDetails">
        
            <table v-if="School.courses">
                <thead>
                    <tr>
                        <th v-for="(School, index) in School.courses.columns" :key="index">
                            {{School}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="(School, index) in School.courses.rows" :key="index">
                    <td v-for="(key, index) in School" :key="index">
                        {{key}}
                    </td>
                </tr>
                </tbody>
            </table>

            <li v-for="point in School.addDetails" :key="point">
                {{point}}
            </li>
        </div>

    </div>
</template>

<script>
export default {
  name: 'Education',
  props: {
    School: Object,
  }
}
</script>

<style scoped>
/* Make sure that padding behaves as expected */
* {box-sizing:border-box}


h3 {
  align-self: center;
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

/* table styles */
table {
    text-align: center;
    border: 1px solid;
}

th {
    border-bottom: 1px solid;
}

</style>

