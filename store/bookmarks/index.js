import { Bookmark } from '~/models/bookmark'

export const state = () => ({
  bookmarks: [],
})

export const mutations = {
  setBookmarks(state, bookmarks = []) {
    bookmarks.forEach((bookmark) => {
      state.bookmarks.push(new Bookmark(bookmark))
    })
  },
  resetBookmakrs(state) {
    state.bookmarks = []
  },
}
