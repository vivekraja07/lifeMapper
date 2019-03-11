<template>
    <div id = "projects">
        <div class="Project" v-for="(project, index) in projects" :key="index">
            <h3 class="title">
                <a :href="project.link" v-if="!project.routerLink"> {{project.title}}
                    <img v-if="project.link" src="../assets/external.png" alt="logo"/>
                </a>
            <router-link v-if="project.routerLink" :to="{name: project.routerLink.name, params: project.routerLink.props}">
              {{project.title}}
              <img src="../assets/external.png" alt="logo"/>
            </router-link>
            </h3>
            <h5 class = "timeRange"> {{project.range}} </h5>
            <li v-for="point in project.details" :key="point">
                {{point}}
            </li>

            <div class="container">
                <span class="label" :class="tag" v-for="tag in project.tags" :key="tag">{{tag}}</span>
            </div>
            <div class="container">
                <a :href="project.github" v-if="project.github"> 
                  <img class="git" src="../assets/github_mark.png" alt="logo"/>
                </a>
                <a :href="project.devpost" v-if="project.devpost"> 
                 <img class="dev" src="../assets/devpost.jpg" alt="logo"/>
                </a>
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


#projects {
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: auto;
}

.container {
    display:flex;
    justify-content: center;
    padding: 5px;
    flex-wrap: wrap;
}

.git,.dev {
    padding-left:  5px;
    padding-right: 5px;
}

.label {
  color: white;
  padding: 8px;
}

.D3\.js, .Vue\.js, .AntHill {background-color: #4CAF50;} /* Green */
.Flask, .Selenium.WebDriver, .Pivotal.Cloud.Foundry, .Maven {background-color: #2196F3;} /* Blue */
.Unity, .Apache.POI, .Node\.js {background-color: #ff9800;} /* Orange */
.SQLite, .Java, .MariaDB, .Jenkins {background-color: #f44336;} /* Red */ 
.C, .VBA, .Jasmine, .Jest {background-color: #a51f83;} /* Gray */

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
