import { Timestamp } from '~/models/timestamp'
export const REGEX_URL = /^https?:\/\/.*/
export class Bookmark extends Timestamp {
  constructor(bookmark = {}) {
    super(bookmark)
    this.description = bookmark.description || ''
    this.tags = bookmark.tags || []
    this.title = bookmark.title || ''
    this.uid = bookmark.uid || ''
    this.url = bookmark.url || ''
  }
}
