<template lang="pug">
input.a-input-text(@input='$emit("input", $event.target.value)')
</template>

<script>
export default {
  name: 'AtomsInputText',
  props: {
    value: { type: String, default: '' },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';
.a-input-text {
  @extend %input;
}
</style>