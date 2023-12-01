import Nav from '@/components/base/nav';
import { Database, connectToDatabase } from '@/lib/db';
import { marked } from 'marked';
import React from 'react';

export default async function UpdatesPage() {
    const { db }: { db: Database } = await connectToDatabase();
  const updates = (await db.collection('page').find({}).toArray()).reverse();
  const latest = updates[0];
    
    return (
        <div>
            <Nav />
            <div className="p-3">
                <div>
                    <h1 className="text-6xl font-bold py-5">
                        Ishan&apos;s Quips
                    </h1>
                    <p className='text-xl text-neutral-800'>
                        Small updates about my life, projects, and more. Updated
                        every few days and are not a part of my garden.
                    </p>
                    <div className="border-r-8 border-b-8 border-neutral-800 border-2 bg-white dark:bg-dark m-1 md:m-10 mt-0 p-4 md:py-8 transform hover:scale-105 rounded-lg cursor-pointer transition duration-300 ease-in-out">
                        <a href={`/updates/${latest.hash}`}>
                            <h1 className="text-2xl md:text-4xl text-center pb-4 font-bold">
                                {latest.name}
                            </h1>
                            <h2 className="text-xl py-4">
                                {new Date(latest.date).toDateString()}
                            </h2>
                            <div
                                className="text-xl leading-10"
                                dangerouslySetInnerHTML={{
                                    __html: marked(
                                        latest.content.slice(0, 400) + '...'
                                    ),
                                }}
                            />
                        </a>
                    </div>
                </div>
                <div className='pb-8'>
                    <h2 className="text-4xl font-bold pb-4">
                        Interested? Read on
                    </h2>
                    <p className='text-xl text-neutral-800'>
                        Thanks for reading! These are small things that I want to
                        share with the world. Hope you enjoy them.{' '}
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {updates.slice(1, updates.length).map((update: any) => (
                        <div key={update.hash} className="pl-4 py-1">
                            <h4 className="text-xl font-regular">
                                <a
                                    className="dark:hover:bg-white hover:p-2 dark:hover:text-black hover:bg-black hover:text-white transform duration-300"
                                    href={`/updates/${update.hash}`}
                                >
                                    {update.name}
                                </a>
                            </h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
