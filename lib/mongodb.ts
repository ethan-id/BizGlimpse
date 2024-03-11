import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB!;

if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
}

if (!MONGODB_DB) {
    throw new Error('Define the MONGODB_DB environmental variable');
}

interface CachedConnection {
    conn: Promise<{ client: MongoClient; db: Db; }> | { client: MongoClient; db: Db; } | null;
    promise: Promise<{ client: MongoClient; db: Db; }> | null;
}

let cached: CachedConnection = global.mongo || { conn: null, promise: null };

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db; }> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = MongoClient.connect(MONGODB_URI).then((client) => {
            return { client, db: client.db(MONGODB_DB) };
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
