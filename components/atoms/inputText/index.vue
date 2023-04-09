<template lang="pug">
input.a-input-text(
  :placeholder='placeholder',
  :value='value',
  @change='$emit("change", $event.target.value)',
  @input='$emit("input", $event.target.value)',
  @focus='$emit("focus")',
  @keydown.enter='onEnter'
)
</template>

<script>
export default {
  name: 'AtomsInputText',
  props: {
    placeholder: { type: String, default: '' },
    value: { type: String, default: '' },
  },
  methods: {
    onEnter($event) {
      if (!$event.isComposing) this.$emit('enter')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';
.a-input-text {
  @extend %input;
}
</style>