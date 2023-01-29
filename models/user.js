export class User {
  constructor(user = {}) {
    this.uid = user.uid || ''
    this.email = user.email || ''
    this.displayName = user.displayName || user.email
  }
}
