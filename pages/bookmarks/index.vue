<template lang="pug">
.p-bookmarks-index
  h2.p-bookmarks-index__title Bookmark
  .p-bookmarks-index__form
    organisms-search-form

  ul.p-bookmarks-index__list
    li.p-bookmarks-index__item(v-for='bookmark in bookmarks')
      atoms-bookmark-card(:bookmark='bookmark')
</template>

<script>
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '~/plugins/firebase'

export default {
  name: 'PagesBookmarksIndex',
  computed: {
    bookmarks() {
      return this.$store.state.bookmarks.bookmarks
    },
  },
  created() {
    // if (this.isSignin) {}
  },
  methods: {
    async onClick(bookmark) {
      try {
        await updateDoc(doc(db, 'bookmarks', bookmark.id), {
          viewed: bookmark.viewed + 1,
        })
      } catch (e) {
        console.error(e)
      }
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