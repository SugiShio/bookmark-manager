<template lang="pug">
.o-search-form
  .o-search-form__item
    label.o-search-form__label
      | Keyword
    .o-search-form__content
      atoms-input-text(
        v-model='searchString',
        @enter='searchBookmark',
        @change='searchBookmark'
      )

  .o-search-form__item
    label.o-search-form__label
      | Tags
    .o-search-form__content
      atoms-input-tags(v-model='tags', @remove-clicked='removeTag')

  .o-search-form__item
    atoms-button(@click='searchBookmark') Search

  //- input(v-model='hitsPerPage')
</template>

<script>
import { client } from '~/plugins/algolia'
import { Bookmark } from '~/models/bookmark'

export default {
  name: 'OrganismsSearchForm',
  data() {
    return {
      hitsPerPage: 10,
      searchString: '',
      tags: [],
    }
  },
  watch: {
    '$route.query'() {
      this.searchBookmark()
    },
    tags() {
      this.$router.push({
        name: 'bookmarks',
        query: this.tags.length ? { tags: this.tags.join(',') } : null,
      })
    },
  },
  created() {
    this.searchBookmark()
  },
  methods: {
    removeTag(tag) {
      const index = this.tags.indexOf(tag)
      if (index > -1) this.tags.splice(index, 1)
    },

    searchBookmark() {
      const index = client.initIndex('bookmarks')
      this.tags = this.$route.query.tags
        ? this.$route.query.tags.split(',')
        : []

      index
        .search(this.searchString, {
          tagFilters: this.tags,
          hitsPerPage: this.hitsPerPage,
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
  &__item {
    margin: 10px 0;

    @media screen and (min-width: 600px) {
      display: flex;
    }
  }

  &__label {
    padding-top: 5px;
    color: #fff;
    width: 70px;
    flex-shrink: 0;
    font-size: 13px;
  }

  &__content {
    flex-grow: 1;
  }

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