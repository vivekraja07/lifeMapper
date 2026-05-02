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
    border-radius: var(--radius, 10px);
    border: 2px solid var(--color-border, #e2e8f0);
    height: 64px;
    width: 64px;
    object-fit: contain;
    background: var(--color-surface, #fff);
    box-shadow: var(--shadow-sm, 0 1px 2px rgba(15, 23, 42, 0.06));
}

</style>
