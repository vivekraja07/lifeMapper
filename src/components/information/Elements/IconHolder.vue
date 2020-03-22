<template>
    <div class = "logoHolder">
        <img :src="require('@/assets/icons/' + icon)"/>
    </div>
</template>

<script>
export default {
  name: 'IconHolder',
  props: {
    icon: String,
  }
}
</script>

<style scoped>
/* logo icon styles go here */

.logoHolder {
  width: 72px;
  height: 72px;
  float: left;
}

.imageHolder {
  border-radius: 6px;
  height: 56px;
  width: 56px;
  background-size: contain;
}

img {
    border-radius: 6px;
    border: 4px solid transparent;
    height: 64px;
    width: 64px;
}

</style>
