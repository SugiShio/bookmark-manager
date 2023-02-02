<template lang="pug">
input.a-input-text(
  :placeholder='placeholder',
  :value='value',
  @change='$emit("change", $event.target.value)',
  @input='$emit("input", $event.target.value)',
  @focus='$emit("focus")'
)
</template>

<script>
export default {
  name: 'AtomsInputText',
  props: {
    placeholder: { type: String, default: '' },
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