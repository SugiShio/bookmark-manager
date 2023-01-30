export class Bookmark {
  constructor(bookmark = {}) {
    this.label = bookmark.label || ''
    this.url = bookmark.url || ''
    this.tags = bookmark.tags || []
  }
}
