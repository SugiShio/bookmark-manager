export class Timestamp {
  constructor(timestamp) {
    this.createdAt = timestamp.createdAt || new Date().getTime()
    this.updatedAt = timestamp.updatedAt || new Date().getTime()
    this.deletedAt = timestamp.deletedAt || null
  }
}
