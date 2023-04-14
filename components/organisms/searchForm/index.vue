<template lang="pug">
.o-search-form
  .o-search-form__input-container
    input.o-search-form__input(
      v-model='searchString',
      @keydown.enter='searchBookmark'
    )
    button.o-search-form__button(type='button', @click='searchBookmark') search
  .o-search-form__input-container
    input.o-search-form__input(v-model='tag', @keydown.enter='enterTag')
  ul
    li(v-for='tag in tags')
      | {{ tag }}
      span(@click='removeTag(tag)') x
</template>

<script>
import { client } from '~/plugins/algolia'
import { Bookmark } from '~/models/bookmark'

export default {
  name: 'OrganismsSearchForm',
  data() {
    return { searchString: '', tag: '', tags: [] }
  },
  created() {
    this.searchBookmark()
  },
  methods: {
    enterTag($event) {
      if ($event.isComposing) return

      this.tags.push(this.tag)
      this.tag = ''
    },
    removeTag(tag) {
      const index = this.tags.indexOf(tag)
      if (index > -1) this.tags.splice(index)
    },
    searchBookmark() {
      if (!this.searchString) return

      const index = client.initIndex('bookmarks')
      index
        .search(this.searchString, {
          tagFilters: this.tags,
        })
        .then(({ hits }) => {
          const bookmarks = hits.map((hit) => {
            return new Bookmark({ id: hit.objectID, ...hit })
          })
          this.$emit('bookmarks-changed', bookmarks)
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';
.o-search-form {
  &__input-container {
    @extend %input;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__input {
    background-color: transparent;
    flex-grow: 1;
  }
}
</style>