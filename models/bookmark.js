import { Timestamp } from '~/models/timestamp'
import { Tag } from '~/models/tag'
export const REGEX_URL = /^https?:\/\/.*/
export class Bookmark extends Timestamp {
  constructor(bookmark = {}) {
    super(bookmark)
    this.description = bookmark.description || ''
    this.tags =
      bookmark.tags.map((tag) => {
        return new Tag(tag)
      }) || []
    this.title = bookmark.title || ''
    this.uid = bookmark.uid || ''
    this.url = bookmark.url || ''
  }
}
