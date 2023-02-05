<template lang="pug">
.a-input-tags
  .a-input-tags__container
    input.a-input-tags__input(
      v-model='string',
      :placeholder='placeholder',
      @keydown.enter='emitTags'
    )
    button.a-input-tags__button(type='button', @click='emitTags') Enter
  ul.a-input-tags__tag-list
    li.a-input-tags__tag-item(v-for='tag in value')
      span.a-input-tags__tag {{ tag }}
</template>

<script>
export default {
  name: 'AtomsInputTags',
  props: {
    placeholder: { type: String, default: '' },
    value: { type: Array, default: () => [] },
  },
  data() {
    return {
      string: '',
    }
  },
  methods: {
    emitTags($event) {
      if ($event.isComposing || !this.string) return
      this.$emit('input', [...this.value, this.string])
      this.string = ''
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';
@import '~/assets/stylesheets/input';
.a-input-tags {
  &__container {
    position: relative;
  }

  &__input {
    @extend %input;
  }

  &__button {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;
    margin: auto;
    color: $color-main;
  }

  &__tag-list {
    margin: 3px -2px;
  }

  &__tag-item {
    padding: 2px;
    display: inline-block;
  }

  &__tag {
    background-color: rgba(#fff, 0.5);
    border-radius: 3px;
    padding: 3px 10px;
  }
}
</style>