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
