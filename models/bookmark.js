import { Tag } from '~/models/tag'

export class Bookmark {
  constructor(bookmark = {}) {
    this.label = bookmark.label || ''
    this.tags =
      bookmark.tags.map((tag) => {
        return new Tag(tag)
      }) || []
    this.uid = bookmark.uid || ''
    this.url = bookmark.url || ''
  }
}
