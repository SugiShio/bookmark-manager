<template lang="pug">
.a-input-tags
  .a-input-tags__container
    ul.a-input-tags__tag-list
      li.a-input-tags__tag-item(v-for='tag in value')
        .a-input-tags__tag
          | {{ tag }}
          span(@click='onRemoveClicked(tag)') ×

    input.a-input-tags__input(
      v-model='string',
      :placeholder='placeholder',
      @input='searchTag'
    )
    ul.a-input-tags__suggest-list(v-show='showSuggests')
      template(v-if='suggests.length')
        li(v-for='tag in suggests', @click='onSuggestClicked(tag)') {{ tag }}
      template(v-if='showCreate')
        li(@click='newTagInput') Create a new tag: '{{ string }}'
</template>

<script>
import { client } from '~/plugins/algolia'

export default {
  name: 'AtomsInputTags',
  props: {
    creatable: { type: Boolean, default: false },
    placeholder: { type: String, default: '+ Add tag' },
    value: { type: Array, default: () => [] },
  },
  data() {
    return {
      string: '',
      suggests: [],
    }
  },
  computed: {
    showCreate() {
      return this.creatable && !this.suggests.includes(this.string)
    },
    showSuggests() {
      return this.suggests.length || (this.string && this.creatable)
    },
  },
  methods: {
    emitTags(tag) {
      this.$emit('input', [...this.value, tag])
    },

    newTagInput() {
      this.$emit('new-tag-input', this.string)
      this.emitTags(this.string)
      this.string = ''
      this.suggests = []
    },

    onSuggestClicked(tag) {
      this.emitTags(tag)
      this.string = ''
      this.suggests = []
    },

    onRemoveClicked(tag) {
      this.$emit('remove-clicked', tag)
    },

    searchTag() {
      if (!this.string) {
        this.suggests = []
        return
      }

      const index = client.initIndex('tags')
      index
        .search(this.string)
        .then(({ hits }) => {
          this.suggests = hits.map((hit) => hit.name)
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
    background-color: rgba(#fff, 0.2);
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
    padding: 3px 10px;

    span {
      margin-left: 3px;
      cursor: pointer;
    }
  }

  &__suggest-list {
    position: absolute;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: rgba(#fff, 0.8);
  }
}
</style>