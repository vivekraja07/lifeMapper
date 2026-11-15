<template>
    <div class = "logoHolder">
        <img :src="require('@/assets/icons/' + icon)" :alt="label ? label + ' logo' : ''"/>
    </div>
</template>

<script>
/**
 * Timeline logo: `icon` is a basename in `src/assets/icons/` and must match
 * the `icon` field on events in `src/data/data.json`.
 */
export default {
  name: 'IconHolder',
  props: {
    icon: String,
    /** Organization name, read out by screen readers as "<label> logo". */
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.logoHolder {
  flex: 0 0 auto;
  width: 52px;
  height: 52px;
}

img {
  display: block;
  width: 52px;
  height: 52px;
  padding: 3px;
  box-sizing: border-box;
  object-fit: contain;
  border-radius: 12px;
  border: 1px solid var(--color-border, #e2e8f0);
  background: #fff;
}
</style>
