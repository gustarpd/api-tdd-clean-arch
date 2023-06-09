import { User } from "../db/schemas/Users.js"

export class AddAccountRepository {
  async add({ name, email, password }) {
    const account = new User({ name, email, password });
    const savedAccount = await account.save();
    return savedAccount;
  }
}