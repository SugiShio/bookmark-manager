<template lang="pug">
main.p-index
  template(v-if='isSignin')
    .p-index__fetching(v-if='isFetching')
      | OGP取得中
    .p-index__message(v-else-if='message')
      | {{ message }}
    .p-index__ogp-card(v-else-if='ogp')
      atoms-ogp-card(:ogp='ogp')

    .p-index__form
      organisms-bookmark-form(
        :ogp='ogp',
        @bookmark-changed='setBookmarks',
        @url-input='onUrlInput'
      )
    h2.p-index__title 🌟 Tags
    molecules-tag-list(:tags='tags', @tag-clicked='onTagClicked')

    h2.p-index__title
      nuxt-link(:to='{ name: "bookmarks" }')
        | 🌟 Bookmarks
    ul
      li(v-for='bookmark in bookmarks') {{ bookmark.title }}
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
      isAlreadyBookmarked: false,
      isFetching: false,
      hasError: false,
      message: '',
      ogp: null,
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

    async onUrlInput(url) {
      this.message = ''
      const q = query(
        collection(db, 'bookmarks'),
        where('uid', '==', this.uid),
        where('url', '==', url)
      )
      try {
        const querySnapshot = await getDocs(q)
        if (querySnapshot.size > 0)
          this.message = 'すでにブックマークされているURLです'
        this.setOgp(url)
      } catch (e) {
        console.error(e)
      }
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
      this.isFetching = true
      this.hasError = false
      try {
        this.ogp = await this.$axios.$get('/api/getOgp', { params: { url } })
        this.isFetching = false
      } catch (error) {
        this.isFetching = false
        this.hasError = true
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

  &__fetching,
  &__message {
    color: #fff;
    text-align: center;
  }

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