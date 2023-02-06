<template lang="pug">
.p-bookmarks-index
  h2.p-bookmarks-index__title {{ queryText }}
  ul.p-bookmarks-index__block-list
    li.p-bookmarks-index__block-item(v-for='bookmarkBlock in bookmarkBlocks')
      time.p-bookmarks-index__block-time {{ bookmarkBlock.date }}
      ul.p-bookmarks-index__bookmark-list
        li.p-bookmarks-index__bookmark-item(
          v-for='bookmark in bookmarkBlock.bookmarks'
        )
          a.p-bookmarks-index__link(:href='bookmark.url', target='_blank')
            | {{ bookmark.title }}

          molecules-tag-list(
            :tags='bookmark.tags',
            @tag-clicked='onTagClicked'
          )
</template>
<script>
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { db } from '~/plugins/firebase'
import { Bookmark } from '~/models/bookmark'

export default {
  name: 'PagesBookmarksIndex',
  data() {
    return {
      bookmarkBlocks: [],
    }
  },
  computed: {
    isSignin() {
      return this.$store.state.isSignin
    },
    uid() {
      return this.$store.state.user.uid
    },
    queryText() {
      const query = this.$route.query
      return Object.keys(query).length
        ? Object.keys(query)
            .map((key) => {
              return `${key}: ${query[key]}`
            })
            .join(', ')
        : 'Bookmarks'
    },
  },
  watch: {
    isSignin(isSignin) {
      if (isSignin) {
        this.setBookmarks()
      }
    },
    '$route.query'(query) {
      this.setBookmarks(query)
    },
  },
  created() {
    if (this.isSignin) {
      this.setBookmarks(this.$route.query)
    }
  },
  methods: {
    async setBookmarks({ tag } = {}) {
      const wheres = [where('uid', '==', this.uid)]
      if (tag) {
        wheres.push(where('tags', 'array-contains', tag))
      }
      const q = query(
        collection(db, 'bookmarks'),
        ...wheres,
        orderBy('createdAt', 'desc'),
        limit(10)
      )
      try {
        const querySnapshot = await getDocs(q)
        this.bookmarkBlocks = []

        querySnapshot.forEach((doc) => {
          const bookmark = new Bookmark(doc.data())
          const block = this.bookmarkBlocks.find(
            (b) => b.date === bookmark.createdAtDateText
          )
          if (block) block.bookmarks.push(bookmark)
          else {
            this.bookmarkBlocks.push({
              date: bookmark.createdAtDateText,
              bookmarks: [bookmark],
            })
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    onTagClicked(tag) {
      this.$router.push({ name: 'bookmarks', query: { tag } })
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

  &__block-list {
    overflow: hidden;
  }

  &__block-item {
    & + & {
      margin-top: 40px;
    }
  }

  &__block-time {
    position: relative;
    color: #fff;
    font-size: 13px;
    overflow: hidden;

    &::before {
      content: '';
      width: 100vw;
      position: absolute;
      left: calc(100% + 10px);
      height: 1px;
      background-color: rgba(#fff, 0.6);
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }

  &__bookmark-list {
    margin-top: 10px;
    padding-left: 10px;
  }

  &__bookmark-item {
    & + & {
      margin-top: 20px;
    }
  }

  &__link {
    color: #fff;
    text-decoration: none;
    line-height: 1.2;
  }
}
</style>