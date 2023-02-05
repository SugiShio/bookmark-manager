<template lang="pug">
a.a-tag(@click='$emit("click", tag)') {{ tag.name }}
</template>

<script>
import { Tag } from '~/models/tag'
export default {
  name: 'AtomsTag',
  props: {
    tag: { type: Tag, default: () => new Tag() },
  },
}
</script>

<style lang="scss" scoped>
.a-tag {
  background-color: rgba(#fff, 0.5);
  border-radius: 3px;
  padding: 2px 8px;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
}
</style>