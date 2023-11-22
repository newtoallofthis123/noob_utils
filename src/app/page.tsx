import Nav from '@/components/base/nav';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { connectToDatabase, type Database } from '@/lib/db';

export default async function Home() {
    const { db }: { db: Database } = await connectToDatabase();
    const data = db.collection('pages').find({}).toArray();
    console.log(JSON.stringify(data));

    return (
        <div>
            <Nav />
            <div className="md:w-3/5 p-2 md:pl-8">
                <h2 className="text-4xl font-semibold pt-4">
                    Nerdiness is here to stay
                </h2>
                <div className="text-neutral-800 text-lg leading-relaxed md:pt-4">
                    <p>
                        Hey! If you are here, you were most likely trying one of
                        my services, either through the Main site, or through
                        one of my other sites. Anyways, welcome to NoobWorld.
                        This is a small website that acts a central hub for all
                        my services.
                    </p>
                    <p>
                        What do I mean by services? Well, I have a few services
                        that I have made for myself, and I have decided to share
                        them with the world.
                    </p>
                    <Button
                        style={{ padding: '20px' }}
                        className="mt-4 text-md"
                    >
                        <Link href="/about">Why this site</Link>
                    </Button>
                </div>
                <div className='mt-4 bg-red-400 border-2 border-black p-3'>
                    <h1 className='text-2xl font-bold'>This site is under ⚠️ Heavy Development</h1>
                    <p>
                        This site is my site&apos;s future main hub. I am currently working on it, and it is not ready for production use. 
                        I am planning on migrating NoobPaste and NoobShort, along with all of my updates to this site.
                        Blog post about this HUGE change coming soon.
                    </p>
                </div>
            </div>
        </div>
    );
}
