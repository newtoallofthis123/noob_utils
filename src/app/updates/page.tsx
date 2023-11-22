import { Database, connectToDatabase } from '@/lib/db';
import React from 'react';

export default async function UpdatePage() {
    const { db }: { db: Database } = await connectToDatabase();
    const updates = await db.collection('page').find({}).toArray();

  return (
    <div>
      {
        JSON.stringify(updates)
      }
      </div>
    )
}
