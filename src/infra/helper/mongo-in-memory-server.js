import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";

export class MemoryServerMongo {
  async connect() {
    this.server = await MongoMemoryServer.create();
    this.uri = this.server.getUri();
    this.client = await MongoClient.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.db = this.client.db()
  }

  async disconnect() {
    await this.client.close()
    this.client = null
    this.db = null
  }

  async getCollection (name) {
    if (!this.client || !this.client ) {
      await this.connect(this.uri)
    }
    return this.db.collection(name)
  }
}
