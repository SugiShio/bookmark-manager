
<template lang="pug">
form.o-bookmark-form
  .o-bookmark-form__item
    label.o-bookmark-form__label
      | URL
    .o-bookmark-form__content
      atoms-input-text(
        v-model='url',
        placeholder='http://example.com',
        @focus='onFocus',
        @input='onUrlInput'
      )

  .o-bookmark-form__item
    label.o-bookmark-form__label
      | label
    .o-bookmark-form__content
      atoms-input-text(v-model='label', placeholder='label')

  .o-bookmark-form__item
    label.o-bookmark-form__label
      | tag
    .o-bookmark-form__content
      atoms-input-tags(v-model='tags', placeholder='tag')
  atoms-button(@click='submit') Submit
</template>

<script>
import { collection, addDoc } from 'firebase/firestore'
import { db, getFirestoreFormat } from '~/plugins/firebase'
import { Bookmark, REGEX_URL } from '~/models/bookmark'

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
    async onFocus() {},
    onUrlInput(value) {
      if (REGEX_URL.test(value)) {
        this.$emit('url-input', value)
      }
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

  &__item {
    margin: 10px 0;
  }

  &__content {
    flex-grow: 1;
  }
}
</style>