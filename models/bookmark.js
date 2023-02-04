import { Timestamp } from '~/models/timestamp'
import { Tag } from '~/models/tag'
export const REGEX_URL = /^https?:\/\/.*/
export class Bookmark extends Timestamp {
  constructor(bookmark = {}) {
    super(bookmark)
    this.label = bookmark.label || ''
    this.tags =
      bookmark.tags.map((tag) => {
        return new Tag(tag)
      }) || []
    this.uid = bookmark.uid || ''
    this.url = bookmark.url || ''
  }
}
