import { MongoClient, Db } from 'mongodb';

declare global {
    var mongo: {
        conn: Promise<{ client: MongoClient; db: Db; }> | null;
        promise: Promise<{ client: MongoClient; db: Db; }> | null;
    } | undefined;
}
