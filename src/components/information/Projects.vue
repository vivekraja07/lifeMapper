<template>
     <div class="Projects">
              <div class="Project" v-for="project in Projects" :key="project.title">
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
    Projects: Array
  }
}
</script>

<style scoped>
* { box-sizing: border-box; }

.Project + .Project {
  margin-top: 1.1rem;
  padding-top: 1.1rem;
  border-top: 1px solid var(--color-border, #e2e8f0);
}

.title {
  margin: 0 0 0.5rem;
  font-family: var(--font-sans, system-ui, sans-serif);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: -0.01em;
  color: var(--color-ink, #0f172a);
}

.project-details-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.project-details-list li {
  position: relative;
  padding-left: 1.1rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.55;
  color: #334155;
}

.project-details-list li:last-child {
  margin-bottom: 0;
}

.project-details-list li::before {
  content: '';
  position: absolute;
  left: 0.15rem;
  top: 0.62em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent, #0ea5e9);
}
</style>
