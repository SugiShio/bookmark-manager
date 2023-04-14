<template lang="pug">
.o-search-form
  .o-search-form__item
    label.o-search-form__label
      | Keyword
    .o-search-form__content
      atoms-input-text(v-model='searchString', @enter='searchBookmark')

  .o-search-form__item
    label.o-search-form__label
      | Tags
    .o-search-form__content
      ul.o-search-form__tag-list
        li.o-search-form__tag-item(v-for='tag in tags')
          .o-search-form__tag
            | {{ tag }}
            span(@click='removeTag(tag)') ×
      input(v-model='tag', @keydown.enter='enterTag')

  button.o-search-form__button(type='button', @click='searchBookmark') search
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

  &__tag-list {
    margin: 3px -2px;
    line-height: 1;
  }

  &__tag-item {
    display: inline-block;
    line-height: 1;
    padding: 2px;
  }

  &__tag {
    background-color: rgba(#fff, 0.2);
    border-radius: 3px;
    padding: 1px 8px;
    color: #fff;
    font-size: 13px;
    text-decoration: none;

    span {
      margin-left: 3px;
      cursor: pointer;
    }
  }
}
</style>