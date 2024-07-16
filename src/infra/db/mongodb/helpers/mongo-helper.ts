import { MongoClient, Collection } from 'mongodb';
/* eslint-disable @typescript-eslint/no-explicit-any */
export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect(uri: string | undefined): Promise<void> {
    this.uri = uri;
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async disconnect(): Promise<void> {
    await this.client.close();
    this.client = null;
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
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
