import { InvalidParam } from "./errors/invalid-filed-error.js";

export class Document {
  constructor({ title, description, owner, url }) {
    this.title = title;
    this.description = description;
    this.owner = owner;
    this.url = url;
  }

  static isURLValid(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  static create({ title, description, owner, url }) {
    if (!this.isURLValid(url)) {
      throw new InvalidParam("URL");
    }
    return new Document({ title, description, owner, url, title });
  }
}
