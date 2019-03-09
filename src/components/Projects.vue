<template>
    <div id = "projects">
        <div class="Project" v-for="(project, index) in projects" :key="index">
            <h3 class="title">
                <a :href="project.link"> {{project.title}}
                    <img src="../assets/external.png" alt="logo"/>
                </a>
            </h3>
            <h5 class = "timeRange"> {{project.range}} </h5>
            <li v-for="point in project.details" :key="point">
                {{point}}
            </li>

            <span class="label" :class="tag" v-for="tag in project.tags" :key="tag">{{tag}}</span>
            <div> 
                 <img class="git" src="../assets/github_mark.png" alt="logo"/>
                <img class="dev" src="../assets/devpost.jpg" alt="logo"/>
            </div>
        </div>
    </div>


</template>

<script>
export default {
  name: 'Projects',
  props: {
    projects: Array
  }
}
</script>

<style scoped>

.label {
  color: white;
  padding: 8px;
}

.D3\.js {background-color: #4CAF50;} /* Green */
.Flask {background-color: #2196F3;} /* Blue */
.Unity {background-color: #ff9800;} /* Orange */
.SQLite {background-color: #f44336;} /* Red */ 
.other {background-color: #e7e7e7; color: black;} /* Gray */

.dev {
    width: 32px;
    height: 32px;
}

h3 {
  text-align: center;
}

h5 {
    text-align: center;
    padding-bottom: 15px;
}

.Project {
  border-bottom: 1px dashed #bdbdbd;
  padding: 20px 30px 16px 24px;
  text-align: left;
}

.Project:last-child  {
  border-bottom: 0px;
  padding-bottom: 0px;
}


</style>
