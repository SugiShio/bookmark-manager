<template lang="pug">
.a-input-tags
  .a-input-tags__container
    input.a-input-tags__input(
      v-model='string',
      :placeholder='placeholder',
      @keydown.enter='onKeyDownEnter',
      @input='searchTag'
    )
    button.a-input-tags__button(type='button', @click='onEnterClicked') Enter
    ul.a-input-tags__suggest-list(v-show='string')
      template(v-if='suggests.length')
        li(v-for='suggest in suggests', @click='onSuggestClicked') {{ suggest }}
      template(v-else)
        li(@click='newTagInput') Create a new tag: '{{ string }}'

  ul.a-input-tags__tag-list
    li.a-input-tags__tag-item(v-for='tag in value')
      span.a-input-tags__tag {{ tag }}
        span
</template>

<script>
import { client } from '~/plugins/algolia'

export default {
  name: 'AtomsInputTags',
  props: {
    placeholder: { type: String, default: '' },
    value: { type: Array, default: () => [] },
  },
  data() {
    return {
      string: '',
      suggests: [],
    }
  },
  methods: {
    newTagInput() {
      this.$emit('new-tag-input', this.string)
      this.string = ''
      this.suggests = []
    },
    emitTags() {
      if (!this.string) return
      this.$emit('input', [...this.value, this.string])
      this.string = ''
      this.suggests = []
    },
    onEnterClicked() {
      this.emitTags()
    },
    onKeyDownEnter($event) {
      if ($event.isComposing) return
      this.emitTags()
    },
    onSuggestClicked($event) {
      this.string = $event.target.textContent
      this.emitTags()
    },

    searchTag($event) {
      const value = $event.target.value
      if (!value || $event.isComposing) return

      const index = client.initIndex('tags')
      index
        .search(value)
        .then(({ hits }) => {
          this.suggests = []
          hits.forEach((hit) => {
            this.suggests.push(hit.name)
          })
        })
        .catch((error) => {
          console.error(error)
        })
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

  &__suggest-list {
    position: absolute;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: rgba(#fff, 0.8);
  }
}
</style>