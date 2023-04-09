<template lang="pug">
a.a-tag(@click='$emit("click", tag)') {{ tag }}
</template>

<script>
export default {
  name: 'AtomsTag',
  props: {
    tag: { type: String, default: '' },
  },
}
</script>

<style lang="scss" scoped>
.a-tag {
  background-color: rgba(#fff, 0.2);
  border-radius: 3px;
  padding: 1px 8px;
  color: #fff;
  font-size: 11px;
  text-decoration: none;
  cursor: pointer;
}
</style>