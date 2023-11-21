import { connectToDatabase, type Database } from '@/lib/db';

export const GET = async (req: Request) => {
    const {searchParams} = new URL(req.url)
    const hash = searchParams.get('hash')
    const { db }: { db: Database } = await connectToDatabase();
    if (hash === null) {
        const data = await db.collection('page').find({}).toArray();
        return Response.json({ data });
    } 
    const data = await db.collection('page').findOne({hash: hash});
    return Response.json({ data });
};
