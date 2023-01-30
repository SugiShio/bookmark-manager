<template lang="pug">
main
  atoms-input-text(v-model='url')
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
      url: '',
    }
  },
  computed: {
    isSignin() {
      return this.$store.state.isSignin
    },
  },
  watch: {
    async isSignin(isSignin) {
      if (isSignin) {
        const uid = this.$store.state.user.uid
        try {
          this.tags = await getTags()
          this.bookmarks = await getBookmarks(uid)
        } catch (error) {
          console.error(error)
        }
      }
    },
  },
  async created() {
    if (this.isSignin) {
      const uid = this.$store.state.user.uid
      try {
        this.tags = await getTags()
        this.bookmarks = await getBookmarks(uid)
      } catch (error) {
        console.error(error)
      }
    }
  },
}
</script>
