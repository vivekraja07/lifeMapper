<template>
  <div class="powerpoint">
    <h1>{{ppTitle}}</h1>
    <iframe :src="ppLink" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> 
    
  </div>
</template>

<script>

export default {
  name: 'powerpoint',
  props: {
    ppTitle: String,
    ppLink: String
  }
}

</script>

<style scoped>


</style>