
<template lang="pug">
form
  | label
  atoms-input-text(v-model='label')
  | url
  atoms-input-text(v-model='url')
  | tag
  atoms-input-text(v-model='tag')
  atoms-button(@click='addTag') addTag
  ul
    li(v-for='tag in tags') {{ tag.name }}
  atoms-button(@click='submit') Submit
</template>

<script>
import { collection, addDoc } from 'firebase/firestore'
import { db, getFirestoreFormat } from '~/plugins/firebase'
import { Tag } from '~/models/tag'
import { Bookmark } from '~/models/bookmark'

export default {
  name: 'OrganismsBookmarkForm',
  data() {
    return {
      label: '',
      tag: '',
      tags: [],
      url: '',
    }
  },
  methods: {
    addTag() {
      if (!this.tag) return
      this.tags.push(new Tag({ name: this.tag }))
      this.tag = ''
    },
    async submit() {
      const data = new Bookmark({
        label: this.label,
        tags: this.tags,
        uid: this.$store.state.user.uid,
        url: this.url,
      })
      try {
        await addDoc(collection(db, 'bookmarks'), getFirestoreFormat(data))
        this.label = ''
        this.tags = []
        this.url = ''
        this.$emit('bookmark-changed')
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.o-bookmark-form {
  &__item {
    display: flex;
  }

  &__label {
    padding-top: 5px;
    color: #fff;
    width: 70px;
    flex-shrink: 0;
  }

  &__content {
    flex-grow: 1;
  }
}
</style>