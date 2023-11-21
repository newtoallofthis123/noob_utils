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
                <div className="text-neutral-700 text-lg leading-relaxed md:pt-4">
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
                {/* <div className="flex flex-row justify-start gap-x-14 mt-4 mb-3">
                    <Button style={{ padding: "24px" }} className="text-lg">
                        <Link href="/services/go">Url Shortener</Link>
                    </Button>
                    <Button style={{ padding: "24px" }} className="text-lg">
                        <Link href="/services/go">Pastebin</Link>
                    </Button>
                    <Button style={{ padding: "24px" }} className="text-lg">
                        <Link href="/services/go">Journal</Link>
                    </Button>
                </div> */}
            </div>
        </div>
    );
}
