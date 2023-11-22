import { connectToDatabase, type Database } from '@/lib/db';

export const GET = async (req: Request) => {
    const url = new URL(req.url);
    const hash = url.pathname.split('/')[2];
    console.log(hash);
    const { db }: { db: Database } = await connectToDatabase();
    const data = await db.collection('go').findOne({ slug: hash });
    if(data === null) {
        return Response.redirect('/404');
    }
    return Response.redirect(data.url);    
};
