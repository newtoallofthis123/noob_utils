import { Database, connectToDatabase } from '@/lib/db';
import { marked } from 'marked';
import React from 'react';

type Props = {
    params: {
        hash: string;
    };
};

export default async function UpdatePage({ params: { hash } }: Props) {
    const { db }: { db: Database } = await connectToDatabase();
    const updates = (await db.collection('page').find().toArray()).reverse();
    const update = updates.find((update) => update.hash === hash);
    if (!update) {
        return <div>404</div>;
    }
    const recommended = updates.filter((u) => new Date(u.date) > new Date(update?.date));

    return (<div className="flex flex-col md:p-10 border-2 border-r-8 border-b-8 rounded-2xl md:m-10 border-black justify-center">
                <div id="update" className="md:w-4/5 w-full">
                    <h1 className="md:text-5xl font-bold text-3xl md:py-4 py-1 pt-0">
                        {update?.name}
                    </h1>
                    <h2 className="font-base p-0 m-0 text-xl">
                        By {update?.author} on{' '}
                        {new Date(update?.date).toDateString()}
                    </h2>
                    <div
                        className="text-lg md:pt-8 p-0 md:leading-10"
                        dangerouslySetInnerHTML={{
                            __html: marked(update?.content, {
                            }),
                        }}
                    />
                </div>
            {recommended && (
                <div className="md:w-4/5 w-full">
                    {recommended.length > 0 ? (
                        <div>
                            <h4 className="md:text-2xl text-xl font-semibold md:pt-6 py-3">
                                Some Quips I Wrote After This
                            </h4>
                            {recommended.map((update: any) => (
                                <div key={update.hash} className="text-xl py-1 font-regular">
                                    <a
                                        className="dark:hover:bg-white no-underline hover:p-2 dark:hover:text-black hover:bg-black hover:text-white transform duration-300"
                                        href={`/updates/${update.hash}`}
                                    >
                                        {update.name}
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-xl">
                            You are at the latest update 😉!{' '}
                        </div>
                    )}
                </div>
            )}
            <p className='text-xl font-bold md:pt-8 pt-5'>
                ©️Ishan&apos;s Quips {new Date().getFullYear()} 
            </p>
        </div>
    );
}
