<template lang="pug">
.p-bookmarks-index
  h2.p-bookmarks-index__title Bookmark
  .p-bookmarks-index__form
    organisms-search-form(@bookmarks-changed='setBookmarks')

  ul.p-bookmarks-index__list
    li.p-bookmarks-index__item(v-for='bookmark in bookmarks')
      atoms-bookmark-card(:bookmark='bookmark')
</template>

<script>
export default {
  name: 'PagesBookmarksIndex',
  data() {
    return {
      bookmarks: [],
    }
  },
  methods: {
    setBookmarks(bookmarks) {
      this.bookmarks = bookmarks
    },
  },
}
</script>

<style lang="scss" scoped>
.p-bookmarks-index {
  max-width: 600px;
  margin: auto;
  padding: 20px;

  &__title {
    font-size: 18px;
    color: #fff;
    margin: 20px 0;
  }

  &__item {
    & + & {
      margin-top: 30px;
    }
  }

  &__list {
    margin: 40px 0;
  }
}
</style>