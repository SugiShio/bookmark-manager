<template lang="pug">
main.p-index
  .p-index__ogp-card
    atoms-ogp-card(:ogp='ogp')

  .p-index__form
    organisms-bookmark-form(
      :ogp-title='ogp.title',
      :ogp-description='ogp.description',
      @bookmark-changed='setBookmarks',
      @url-input='setOgp'
    )

  ul
    li(v-for='tag in tags') {{ tag.name }}
  ul
    li(v-for='bookmark in bookmarks') {{ bookmark.title }}
</template>

<script>
import { collection, query, getDocs, where } from 'firebase/firestore'
import { db } from '~/plugins/firebase'
import { Bookmark } from '~/models/bookmark'
import { Tag } from '~/models/tag'

export default {
  name: 'IndexPage',
  data() {
    return {
      bookmarks: [],
      ogp: {},
      tags: [],
    }
  },
  computed: {
    isSignin() {
      return this.$store.state.isSignin
    },
    uid() {
      return this.$store.state.user.uid
    },
  },
  watch: {
    isSignin(isSignin) {
      if (isSignin) {
        this.setBookmarks()
        this.setTags()
      }
    },
  },
  created() {
    if (this.isSignin) {
      this.setBookmarks()
      this.setTags()
    }
  },
  methods: {
    async setBookmarks() {
      const q = query(collection(db, 'bookmarks'), where('uid', '==', this.uid))
      try {
        const querySnapshot = await getDocs(q)
        this.bookmarks = []
        querySnapshot.forEach((doc) => {
          this.bookmarks.push(new Bookmark(doc.data()))
        })
      } catch (error) {
        console.error(error)
      }
    },
    async setOgp(url) {
      try {
        this.ogp = await this.$axios.$get('/api/getOgp', { params: { url } })
      } catch (error) {
        console.error(error)
      }
    },
    async setTags() {
      const q = query(collection(db, 'tags'), where('uid', '==', this.uid))
      try {
        const querySnapshot = await getDocs(q)
        this.tags = []
        querySnapshot.forEach((doc) => {
          this.tags.push(new Tag(doc.data()))
        })
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.p-index {
  max-width: 600px;
  margin: auto;
  padding: 20px;

  &__form {
    margin: 20px 0;
  }
}
</style>