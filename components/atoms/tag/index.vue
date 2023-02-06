<template lang="pug">
a.a-tag(@click='$emit("click", tag)') {{ tag }}
</template>

<script>
import { Tag } from '~/models/tag'
export default {
  name: 'AtomsTag',
  props: {
    tag: { type: String, default: '' },
  },
}
</script>

<style lang="scss" scoped>
.a-tag {
  background-color: rgba(#fff, 0.5);
  border-radius: 3px;
  padding: 1px 8px;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
}
</style>