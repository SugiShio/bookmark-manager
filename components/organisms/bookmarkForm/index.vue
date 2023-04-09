
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
      | title
    .o-bookmark-form__content
      atoms-input-text(v-model='title', placeholder='title')

  .o-bookmark-form__item
    label.o-bookmark-form__label
      | tag
    .o-bookmark-form__content
      atoms-input-tags(
        v-model='tags',
        placeholder='tag',
        @new-tag-input='onNewTagInput'
      )

  .o-bookmark-form__item
    label.o-bookmark-form__label
      | memo
    .o-bookmark-form__content
      atoms-input-text(v-model='description', placeholder='description')

  atoms-button(@click='submit') Submit
</template>

<script>
import { collection, addDoc } from 'firebase/firestore'
import { db, getFirestoreFormat } from '~/plugins/firebase'
import { Bookmark, REGEX_URL } from '~/models/bookmark'
import { Tag } from '~/models/tag'

export default {
  name: 'OrganismsBookmarkForm',
  props: {
    ogp: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      description: '',
      newTags: [],
      tag: '',
      tags: [],
      title: '',
      url: '',
    }
  },
  watch: {
    'ogp.title'(ogpTitle) {
      this.title = ogpTitle
    },
    'ogp.description'(ogpDescription) {
      this.description = ogpDescription
    },
  },
  async mounted() {
    if (!window.document.hasFocus()) return
    const clipboard = await navigator.clipboard.readText()
    if (REGEX_URL.test(clipboard)) {
      this.url = clipboard
      this.onUrlInput()
    }
  },
  methods: {
    onNewTagInput($event) {
      this.tags.push($event)
      this.newTags.push(new Tag({ name: $event }))
    },
    async onFocus() {},
    onUrlInput() {
      if (REGEX_URL.test(this.url)) {
        this.$emit('url-input', this.url)
      }
    },
    async submit() {
      const bookmark = new Bookmark({
        title: this.title,
        description: this.description,
        tags: this.tags,
        uid: this.$store.state.user.uid,
        url: this.url,
      })
      const createTagFunctions = this.newTags.map(async (tag) => {
        await addDoc(collection(db, 'tags'), getFirestoreFormat(tag))
      })
      try {
        await Promise.all([
          addDoc(collection(db, 'bookmarks'), getFirestoreFormat(bookmark)),
          ...createTagFunctions,
        ])
        this.description = ''
        this.newTags = []
        this.tags = []
        this.title = ''
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
    @media screen and (min-width: 600px) {
      display: flex;
    }
  }

  &__label {
    padding-top: 5px;
    color: #fff;
    width: 70px;
    flex-shrink: 0;
    font-size: 13px;
  }

  &__item {
    margin: 10px 0;
  }

  &__content {
    flex-grow: 1;
  }
}
</style>