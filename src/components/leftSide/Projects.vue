<template>
    <div id = "projects">
        <div class="Project" v-for="(project, index) in projects" :key="index">
            <h3 class="title">
                <a :href="project.link" v-if="!project.routerLink"> {{project.title}}
                    <img v-if="project.link" src="@/assets/ui/external.png" alt="logo"/>
                </a>
            <router-link v-if="project.routerLink" :to="{name: project.routerLink.name, params: project.routerLink.props}">
              {{project.title}}
              <img src="@/assets/ui/external.png" alt="logo"/>
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
                  <img class="git" src="@/assets/ui/github_mark.png" alt="logo"/>
                </a>
                <a :href="project.devpost" v-if="project.devpost">
                 <img class="dev" src="@/assets/social/devpost.svg" alt="Devpost">
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
  overflow-x: hidden;
  padding: 0 0.5rem 1rem;
  box-sizing: border-box;
  background: var(--color-surface, #fff);
  scrollbar-gutter: stable;
}

.container {
    display:flex;
    justify-content: center;
    padding: 0.35rem 0.25rem;
    flex-wrap: wrap;
    gap: 0.35rem;
}

.git,.dev {
    padding-left:  5px;
    padding-right: 5px;
}

.label {
  color: white;
  padding: 0.35rem 0.65rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  border-radius: 6px;
  box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.08));
}

.D3\.js, .Vue\.js, .AntHill {background-color: #16a34a;}
.Flask, .Selenium.WebDriver, .Pivotal.Cloud.Foundry, .Maven, .React\.js, .SciPy {background-color: #0284c7;}
.Unity, .Apache.POI, .Node\.js, .Differential.Privacy {background-color: #ea580c;}
.SQLite, .Java, .MariaDB, .Jenkins, .ESRI {background-color: #dc2626;}
.C, .VBA, .Jasmine, .Jest, .Python {background-color: #a21caf;}

.dev {
    width: 32px;
    height: 32px;
    border-radius: 6px;
}

h3 {
  text-align: center;
  font-family: var(--font-display, system-ui, sans-serif);
  font-weight: var(--font-heading-weight, 700);
  font-size: 1.0625rem;
  letter-spacing: -0.02em;
}

h3 a, h3 .router-link-active {
  color: var(--color-accent, #0ea5e9);
  text-decoration: none;
  transition: color 0.2s ease;
}

h3 a:hover {
  color: var(--color-accent-hover, #0284c7);
  text-decoration: underline;
}

h5 {
    text-align: center;
    padding-bottom: 0.75rem;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--color-muted, #64748b);
}

.Project {
  border-bottom: var(--border-section-width, 3px) solid var(--color-border, #e2e8f0);
  padding: 1.25rem 0.75rem 1rem;
  text-align: left;
}

.Project:last-child  {
  border-bottom: 0;
  padding-bottom: 0;
}

.Project li {
  line-height: 1.55;
  margin-bottom: 0.35rem;
  font-size: 0.9375rem;
}

</style>
