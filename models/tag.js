import { Timestamp } from '~/models/timestamp'
export class Tag extends Timestamp {
  constructor(tag = {}) {
    super(tag)
    this.name = tag.name || ''
  }
}
