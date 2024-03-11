import { MongoClient, Db } from 'mongodb';

declare global {
    namespace NodeJS {
        interface Global {
            mongo: {
                conn: Promise<{ client: MongoClient; db: Db; }> | null;
                promise: Promise<{ client: MongoClient; db: Db; }> | null;
            };
            test: string;
        }
    }
}
