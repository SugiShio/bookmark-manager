<template lang="pug">
.o-search-form
  .o-search-form__input-container
    input.o-search-form__input(v-model='searchString', @enter='searchBookmark')
    button.o-search-form__button(type='button', @click='searchBookmark') search
</template>

<script>
import { client } from '~/plugins/algolia'
import { Bookmark } from '~/models/bookmark'

export default {
  name: 'OrganismsSearchForm',
  data() {
    return { searchString: 'あんこ' }
  },
  created() {
    this.searchBookmark()
  },
  methods: {
    searchBookmark() {
      if (!this.searchString) return

      const index = client.initIndex('bookmarks')
      index
        .search(this.searchString)
        .then(({ hits }) => {
          this.$store.commit('bookmarks/resetBookmakrs')
          const bookmarks = hits.map((hit) => {
            return new Bookmark({ id: hit.objectID, ...hit })
          })
          this.$store.commit('bookmarks/setBookmarks', bookmarks)
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
  }

  &__input {
    background-color: transparent;
    flex-grow: 1;
  }
}
</style>