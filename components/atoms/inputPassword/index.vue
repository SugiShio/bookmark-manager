<template lang="pug">
.a-input-password
  input.a-input-password__input(
    :value='value',
    :type='inputType',
    @input='$emit("input", $event.target.value)',
    @focus='$emit("focus")'
  )
  button.a-input-password__button(
    type='button',
    @click='isValueHide = !isValueHide'
  ) 👀
</template>

<script>
export default {
  name: 'AtomsInputPassword',
  props: {
    value: { type: String, default: '' },
  },
  data() {
    return {
      isValueHide: true,
    }
  },
  computed: {
    inputType() {
      return this.isValueHide ? 'password' : 'text'
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';
.a-input-password {
  position: relative;

  &__input {
    @extend %input;
    flex-grow: 1;
    background-color: transparent;
  }

  &__button {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;
    margin: auto;
  }
}
</style>