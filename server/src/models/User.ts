export type User = {
  username: string
  authentication: {
    password: string
    salt: string
    sessionToken?: string
  }
}

export class UsersDB {
  private static instance: UsersDB
  private users: Map<string, User>

  private constructor() {
    this.users = new Map<string, User>()
  }

  public static getInstance(): UsersDB {
    if (!UsersDB.instance) {
      UsersDB.instance = new UsersDB()
    }
    return UsersDB.instance
  }

  addUser(user: User): User | undefined {
    this.users.set(user.username, user)
    return this.users.get(user.username)
  }

  getUser(username: string): User | undefined {
    return this.users.get(username)
  }

  getUsers() {
    const arr = Array.from(this.users, ([username, value]) => ({ username, value }));
    return arr
  }

  updateUser(user:User): User | undefined {
    this.users.set(user.username, user)
    return this.users.get(user.username)
  }
}