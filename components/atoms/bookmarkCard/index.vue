<template lang="pug">
a.a-bookmark-card(
  :href='bookmark.url',
  @click='onClick(bookmark)',
  target='_blank'
)
  .a-bookmark-card__ogp-image(:style='{ backgroundImage: `url(${ogpImage})` }')
  .a-bookmark-card__content
    h3.a-bookmark-card__title {{ bookmark.title }}
    p.a-bookmark-card__description {{ bookmark.description }}
    .a-bookmark-card__tag-list
      molecules-tag-list(:tags='bookmark.tags')
</template>

<script>
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '~/plugins/firebase'
import { Bookmark } from '~/models/bookmark'

export default {
  name: 'AtomsBookmarkCard',
  props: {
    bookmark: {
      type: Bookmark,
      required: true,
      default: () => {
        return new Bookmark()
      },
    },
  },
  data() {
    return {
      ogpImage: null,
    }
  },
  watch: {
    bookmark() {
      this.setOgpImage()
    },
  },
  created() {
    this.setOgpImage()
  },
  methods: {
    async onClick() {
      try {
        await updateDoc(doc(db, 'bookmarks', this.bookmark.id), {
          viewed: this.bookmark.viewed + 1,
        })
      } catch (e) {
        console.error(e)
      }
    },

    async setOgpImage() {
      this.ogpImage = null
      try {
        const ogp = await this.$axios.$get('/api/getOgp', {
          params: { url: this.bookmark.url },
        })
        this.ogpImage = ogp.image
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.a-bookmark-card {
  display: flex;
  text-decoration: none;
  color: #fff;

  &__ogp-image {
    background-color: rgba(#bbb, 0.8);
    background-size: cover;
    background-position: center center;
    border-radius: 5px;
    flex-shrink: 0;
    width: 80px;
    height: 80px;
  }

  &__content {
    margin-left: 20px;
  }

  &__description {
    font-size: 13px;
  }

  &__tag-list {
    margin-top: 5px;
  }
}
</style>