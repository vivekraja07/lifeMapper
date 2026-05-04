<template>
     <div class="Projects">
              <h2 class="sectionTitle"> Projects</h2>
              <div class="Project" v-for="project in Projects" v-on:click="sideBarToggle()" :key="project.title">
                  <h3 class="title"> {{project.title}} </h3>
                  <ul class="project-details-list">
                      <li v-for="point in project.details" :key="point">
                          {{point}}
                      </li>
                  </ul>
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
  padding-top: 0.95rem;
  padding-bottom: 0.7rem;
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
  margin-bottom: 0.25rem;
}

.project-details-list {
  margin: 0;
  padding-left: 1rem;
  list-style-position: outside;
}

.project-details-list li {
  line-height: 1.38;
  margin-bottom: 0.22rem;
  padding-left: 0;
  font-size: 0.9375rem;
}

</style>