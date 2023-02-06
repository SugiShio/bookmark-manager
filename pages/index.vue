<template lang="pug">
main.p-index
  template(v-if='isSignin')
    .p-index__ogp-card
      atoms-ogp-card(:ogp='ogp')

    .p-index__form
      organisms-bookmark-form(
        :ogp-title='ogp.title',
        :ogp-description='ogp.description',
        @bookmark-changed='setBookmarks',
        @url-input='setOgp'
      )
    h2.p-index__title 🌟 Tags
    molecules-tag-list(:tags='tags', @tag-clicked='onTagClicked')

    h2.p-index__title 🌟 Bookmarks
    ul
      li(v-for='bookmark in bookmarks') {{ bookmark.title }}

  nuxt-link(:to='{ name: "bookmarks" }') Bookmarks
</template>

<script>
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore'
import { db } from '~/plugins/firebase'
import { Bookmark } from '~/models/bookmark'

export default {
  name: 'PagesIndex',
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
    onTagClicked(tag) {
      this.$router.push({ name: 'bookmarks', query: { tag } })
    },

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
      const q = query(collection(db, 'tags'), orderBy('createdAt', 'desc'))
      try {
        const querySnapshot = await getDocs(q)
        this.tags = []
        querySnapshot.forEach((doc) => {
          this.tags.push(doc.data().name)
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

  &__title {
    color: #fff;
    font-size: 18px;
    margin: 40px 0 10px;
  }

  &__form {
    margin: 20px 0;
  }
}
</style>