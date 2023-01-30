<template lang="pug">
main
  organisms-bookmark-form(@bookmark-changed='setBookmarks')
  ul
    li(v-for='tag in tags') {{ tag.name }}
  ul
    li(v-for='bookmark in bookmarks') {{ bookmark.label }}
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
