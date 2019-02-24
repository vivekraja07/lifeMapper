<template>
  <div id="profile">
      <div class = "logoHolder">
          <img src="../assets/econ2.png">
      </div>

      <h1> Vivekanand Rajasekar </h1>

  </div>
</template>

<script>
export default {
  name: 'Profile',
  components: {

  },
  props: {
    events: Object
  },
}

</script>

<style scoped>

#profile {
  width: 100%;
  height: 100%;
  text-align: center;
}

.logoHolder {
  width: 100%;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
}

img {
  width: 90%;
  height: 60%;
  
}

</style>
