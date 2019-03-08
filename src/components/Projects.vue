<template>
    <div id='features'>
        <div id = "events">
            <section v-for="(project, index) in projects" :key="index">
                <h3 class="title"> {{project.title}} </h3>
                <li v-for="point in project.details" :key="point">
                    {{point}}
                </li>
            </section>
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


</style>
