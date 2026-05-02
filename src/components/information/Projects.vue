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
  border-bottom: var(--border-section-width, 3px) solid var(--color-border, #e2e8f0);
  padding-top: 1.25rem;
  padding-bottom: 1rem;
}

.Project:last-child  {
  border-bottom: 0;
  padding-bottom: 0;
}

.Project:first-of-type  {
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

.title {
  font-family: var(--font-display, system-ui, sans-serif);
  font-weight: var(--font-heading-weight, 700);
  font-size: 1rem;
  margin-bottom: 0.35rem;
}

.Project li {
  line-height: 1.55;
  margin-bottom: 0.35rem;
}

</style>