<template lang="pug">
ul.m-tag-list
  li.m-tag-list__item(v-for='tag in tags')
    atoms-tag(:tag='tag', @click='$emit("tag-clicked", $event)')
</template>

<script>
export default {
  name: 'MoleculesTagList',
  props: {
    tags: { type: Array, default: () => [] },
  },
}
</script>

<style lang="scss" scoped>
.m-tag-list {
  margin: -2px;
  line-height: 1;

  &__item {
    display: inline-block;
    line-height: 1;
    padding: 2px;
  }
}
</style>