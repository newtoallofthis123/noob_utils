import { ranHash } from '@/lib/common';
import { connectToDatabase, type Database } from '@/lib/db';

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const hash = searchParams.get('hash');
    const { db }: { db: Database } = await connectToDatabase();
    if (hash === null) {
        return Response.json({ 
            "error": "no hash provided"
         });
    }
    const data = await db.collection('code').findOne({ hash: hash });
    return Response.json({ data });
};

export const POST= async (request: Request) => {
    const body = await request.json();
    const { title, content, author, lang } = body;
    const hash = ranHash();

    const { db }: { db: Database } = await connectToDatabase();

    const insertResult = await db.collection('code').insertOne({
        title,
        content,
        author,
        hash,
        lang: lang,
    });

    const result = {
        insertResult,
        hash,
    };

    return new Response(JSON.stringify(result), {
        headers: { 'content-type': 'application/json' },
    });
};