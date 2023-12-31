import { ranHash } from '@/lib/common';
import { connectToDatabase, type Database } from '@/lib/db';

export const GET = async (req: Request) => {
    const {searchParams} = new URL(req.url)
    const slug = searchParams.get('slug')
    const { db }: { db: Database } = await connectToDatabase();
    if (slug === null) {
        return Response.json({ 
            "error": "no slug provided"
         });
    } 
    const data = await db.collection('go').findOne({slug});
    return Response.json({ data });
};

export const POST = async (request: Request) => {
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
