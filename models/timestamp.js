const DAY_TEXTS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export class Timestamp {
  constructor(timestamp) {
    this.createdAt = timestamp.createdAt || new Date().getTime()
    this.updatedAt = timestamp.updatedAt || new Date().getTime()
    this.deletedAt = timestamp.deletedAt || null
  }

  getDate(timestamp) {
    const date = new Date(timestamp)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }

  get createdAtDate() {
    return this.getDate(this.createdAt)
  }

  getDateText(timestamp) {
    const date = new Date(timestamp)
    const y = date.getFullYear()
    const m = date.getMonth()
    const d = date.getDate()
    const day = date.getDay()
    return `${y}.${m + 1}.${d} ${DAY_TEXTS[day]}`
  }

  get createdAtDateText() {
    return this.getDateText(this.createdAt)
  }
}
