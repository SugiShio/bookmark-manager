<template lang="pug">
main
  organisms-bookmark-form(@bookmark-changed='onBookmarkChanged')
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

const getTags = async () => {
  const q = query(collection(db, 'tags'))

  const querySnapshot = await getDocs(q)
  const result = []
  querySnapshot.forEach((doc) => {
    result.push(new Tag(doc.data()))
  })
  return result
}

const getBookmarks = async (uid) => {
  const q = query(collection(db, 'bookmarks'), where('uid', '==', uid))

  const querySnapshot = await getDocs(q)
  const result = []
  querySnapshot.forEach((doc) => {
    result.push(new Bookmark(doc.data()))
  })
  return result
}

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
    async isSignin(isSignin) {
      if (isSignin) {
        try {
          this.tags = await getTags()
          this.bookmarks = await getBookmarks(this.uid)
        } catch (error) {
          console.error(error)
        }
      }
    },
  },
  async created() {
    if (this.isSignin) {
      try {
        this.tags = await getTags()
        this.bookmarks = await getBookmarks(this.uid)
      } catch (error) {
        console.error(error)
      }
    }
  },
  methods: {
    async onBookmarkChanged() {
      try {
        this.bookmarks = await getBookmarks(this.uid)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
