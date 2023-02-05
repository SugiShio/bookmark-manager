<template lang="pug">
.a-modal
  .a-modal__container
    slot
    .a-modal__close-button
      button(type='button', @click='$emit("close-clicked")') close
</template>

<script>
export default {
  name: 'AtomsModal',
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.a-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(#000, 0.9);
  z-index: $z-index-modal;

  &__container {
    margin: 10px;
    padding: 10px;
    width: 600px;
    max-width: 100%;
    background-color: #fff;
  }

  &__close-button {
    margin-top: 10px;
    text-align: center;

    button {
      text-decoration: underline;
      display: inline-block;
    }
  }
}
</style>