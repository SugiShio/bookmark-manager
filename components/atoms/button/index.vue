<template lang="pug">
button.a-button(type='button', @click='$emit("click")')
  slot
</template>

<script>
export default {
  name: 'AtomsButton',
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';
.a-button {
  @extend %input;
}
</style>
