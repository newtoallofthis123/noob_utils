import { ranHash } from '@/lib/common';
import { connectToDatabase, type Database } from '@/lib/db';

export const POST = async (request: Request ) => {
    const data = await request.formData();
    const url = data.get('url');
    const slug = data.get('slug') || ranHash();
    const count = 0;
    const { db }: { db: Database } = await connectToDatabase();
    const go_data = await db.collection('go').insertOne({
        url: url,
        slug: slug,
        count: count,
    });
    const result = {
        go_data,
        slug,
    };
    return new Response(JSON.stringify(result), {
        headers: { 'content-type': 'application/json' },
    });
};
