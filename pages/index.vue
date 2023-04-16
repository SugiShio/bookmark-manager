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

    h2.p-index__title
      | 🌟 Recent bookmarks
    ul.p-index__bookmark-list
      li(v-for='bookmark in bookmarks')
        a.p-index__bookmark-link(:href='bookmark.url') {{ bookmark.title }}
    .p-index__more-link
      nuxt-link(:to='{ name: "bookmarks" }') See more

    h2.p-index__title 🌟 Popular tags
    molecules-tag-list(:tags='tags')
    .p-index__more-link
      nuxt-link(:to='{ name: "tags" }') See more
</template>

<script>
import {
  collection,
  limit,
  query,
  getDocs,
  orderBy,
  where,
} from 'firebase/firestore'
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
      const q = query(
        collection(db, 'bookmarks'),
        orderBy('createdAt', 'desc'),
        where('uid', '==', this.uid),
        limit(5)
      )
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
      const q = query(
        collection(db, 'tags'),
        orderBy('createdAt', 'desc'),
        limit(10)
      )
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

  &__bookmark-list {
    margin: 10px 0;
  }

  &__bookmark-link {
    color: #fff;
  }

  &__more-link {
    margin-top: 15px;
    text-align: right;

    a {
      padding-right: 30px;
      position: relative;
      font-size: 11px;
      color: #fff;
      text-decoration: none;

      &::before,
      &::after {
        content: '';
        display: block;
        position: absolute;
        background-color: #fff;
      }

      &::before {
        right: 0;
        bottom: 5px;
        height: 1px;
        width: 7px;
        transform: rotate(45deg);
        transform-origin: 100%;
      }

      &::after {
        right: 0;
        bottom: 5px;
        height: 1px;
        width: 25px;
      }
    }
  }
}
</style>