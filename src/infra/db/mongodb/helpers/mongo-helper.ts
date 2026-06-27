import { MongoClient, Collection } from 'mongodb';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const MongoHelper = {
  client: null as MongoClient | null,
  uri: undefined as string | undefined,

  async connect(uri: string | undefined): Promise<void> {
    const mongoUri =
      uri || process.env.MONGO_URL || (global as { __MONGO_URI__?: string }).__MONGO_URI__;

    if (!mongoUri) {
      throw new Error('MongoDB connection URI was not provided');
    }

    this.uri = mongoUri;
    this.client = await MongoClient.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async disconnect(): Promise<void> {
    if (!this.client) {
      return;
    }
    await this.client.close();
    this.client = null;
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri);
    }
    return this.client.db().collection(name);
  },

  map: (data: any): any => {
    const { _id, ...collectionWithoutId } = data;
    return Object.assign({}, collectionWithoutId, { id: _id });
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map((c) => MongoHelper.map(c));
  },
};
