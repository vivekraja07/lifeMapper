<template>
     <div class="Projects">
              <h2 class="sectionTitle"> Projects</h2>
              <div class="Project" v-for="project in Projects" v-on:click="sideBarToggle()" :key="project.title">
                  <h3 class="title"> {{project.title}} </h3>
                  <li v-for="point in project.details" :key="point">
                      {{point}}
                  </li>
              </div>
          </div>
</template>

<script>
export default {
  name: 'Projects',
  props: {
    Projects: Array,
  }
}
</script>

<style scoped>
/* Make sure that padding behaves as expected */
* {box-sizing:border-box}


.Project {
  border-bottom: 1px dashed #bdbdbd;
  padding-top: 20px;
  padding-bottom: 16px;
}

.Project:last-child  {
  border-bottom: 0px;
  padding-bottom: 0px;
}

.Project:first-of-type  {
  padding-top: 0px;
}

.sectionTitle {
    text-align: center;
}

</style>