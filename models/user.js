import { Timestamp } from '~/models/timestamp'
export class User extends Timestamp {
  constructor(user = {}) {
    super(user)
    this.uid = user.uid || ''
    this.email = user.email || ''
    this.displayName = user.displayName || user.email
  }
}
