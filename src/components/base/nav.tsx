import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

export default function Nav() {
    async function search(formData: FormData) {
        'use server';

        const query = formData.get('query') as string;
        redirect('/search/' + query);
    }

    return (
        <>
            <nav>
                <div
                    className="flex flex-row justify-between items-center p-3 border-b-2 border-neutral-200 shadow-md"
                >
                    <div className="flex-shrink-0 flex flex-row justify-around">
                        <h1 className="text-2xl text-stone-800 dark:text-gray-50 font-bold p-1 ml-2">
                            🌏️ NoobWorld
                        </h1>
                    </div>
                    <div className="gap-x-10">
                        <ul className="gap-x-8 flex flex-row">
                            {[
                                'services',
                                'docs',
                                'journal',
                                'about',
                            ].map((link) => {
                                return (
                                    <li className="text-lg text-gray-500 hover:text-gray-800" key={link}>
                                        <a href={'/' + link}>
                                            {link.slice(0, 1).toUpperCase() +
                                                link.slice(1)}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <form
                        action={search}
                        className="flex flex-row border-2 w-96 border-neutral-400 rounded-xl drop-shadow-lg"
                    >
                        <Input
                            type="search"
                            autoComplete="off"
                            spellCheck="false"
                            name="query"
                            required={true}
                            className="border-0 focus-visible:outline-none focus-visible:ring-0"
                            placeholder="Search for utilities or anything else"
                        />
                        <Button
                            className="bg-inherit border-0 shadow-none text-black text-xl hover:bg-inherit"
                            type="submit"
                        >
                            🔍
                        </Button>
                    </form>
                </div>
            </nav>
        </>
    );
}
