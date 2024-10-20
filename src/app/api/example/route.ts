import clientPromise from '@/utils/database';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("your_database_name");

    // Perform database operations here
    const collection = db.collection("your_collection_name");
    const results = await collection.find({}).limit(10).toArray();

    return NextResponse.json(results);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
