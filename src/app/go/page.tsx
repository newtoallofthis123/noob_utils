'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function GoForm() {
    const [slug, setSlug] = useState('');
    const { toast } = useToast();

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (!formData.get('url'))
            return toast({
                title: 'Error',
                description: 'URL is required',
            });
        const response = await fetch('/api/go/add', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (data.error)
            return toast({
                title: 'Error',
                description: data.error,
            });
        else {
            setSlug(data.slug);
        }
    }
    return (
        <div className="md:mt-10 px-10">
            <h1 className="text-5xl p-2">NoobShort</h1>
            <p className="text-lg p-2">
                Because simplicity is the ultimate sophistication.
            </p>
            <div className="mt-0 pt-4 p-2">
                <form
                    onSubmit={submit}
                    style={{
                        boxShadow: '0.3em 0.4em',
                    }}
                    className="border-2 px-2 border-black dark:border-neutral-50 w-full md:w-3/5 mt-2 mb-4 rounded-xl"
                >
                    <Input
                        autoComplete="off"
                        type="url"
                        className="w-5/6 p-2 dark:bg-neutral-900 border-black dark:border-neutral-50 focus:outline-none text-lg"
                        name="url"
                        placeholder="Paste the Long Thing Here"
                    />
                    <Button className="bg-inherit hover:bg-inherit text-black w-1/6 p-2 text-lg" type="submit">
                        Shorten It!
                    </Button>
                </form>
                <div>
                    <span className="text-lg font-base py-3">
                        Thank me later for this:{' '}
                    </span>{' '}
                    <a
                        href={'https://noobscience.rocks/go/' + slug}
                        className="text-lg font-base underline"
                    >
                        {slug}
                    </a>{' '}
                    {slug && (
                        <span
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    'https://noobscience.rocks/go/' + slug
                                );
                                toast({
                                    title: 'Copied',
                                    description: 'Copied to clipboard',
                                });
                            }}
                        >
                            <i className="bi bi-clipboard text-2xl font-base cursor-pointer"></i>
                        </span>
                    )}
                </div>
                <h2 className="text-xl font-bold py-2">Mandatory Dev Stuff</h2>
                <p className="md:w-3/5 leading-8 text-base">
                    Hey! I am Ishan, the creator of NoobShort. NoobShort was
                    initially a huge flask app with postgres. But, now, it is a
                    simple React Component that uses MongoDB. This is mostly
                    just to be used by me and my friends. But, if you want to
                    use it, you can. However, don&apos;t post anything illegal.
                    I regularly delete all the data from the database. So,
                    don&apos;t expect your links to be there forever.
                </p>
                <h2 className="text-xl font-bold py-2">NoobShort CLI!</h2>
                <p className="md:w-3/5 leading-8 text-base">
                    Same shortener, but from the comfort of your terminal. Check
                    it out at
                    <a
                        href="https://github.com/newtoallofthis123/short_cli"
                        className="underline"
                    >
                        {' '}
                        newtoallofthis123/short_cli
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
