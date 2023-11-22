"use client"

import { Input } from '@/components/ui/input';
import React from 'react';

type Props = {};

export default function CodeEditor({}: Props) {
    const [link, setLink] = React.useState('');

    const addCode = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const title = e.currentTarget.code_title.value;
        const content = e.currentTarget.content.value;
        const code_lang = e.currentTarget.code_lang.value;
        const author = e.currentTarget.author.value;
        fetch('/api/code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                content: content,
                lang: code_lang,
                author: author,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setLink('/code/' + data.hash);
            })
            .catch(() => {
                console.log('Error posting Code');
            });
    };
    return (
        <>
            <div className="md:p-10">
                <h1 className="md:text-4xl text-2xl pb-3 px-2 font-heading">
                    NoobPaste
                </h1>
                <p className="px-2">
                    {link ? (
                        <span>
                            <a href={link} className="text-blue-500">
                                {window.location.href +
                                    link.replace('/code', '')}
                            </a>
                        </span>
                    ) : (
                        <span>Simple and Efficient Code Sharing.</span>
                    )}
                </p>
                <form
                    onSubmit={addCode}
                    className="border-2 border-r-8 border-b-8 rounded-2xl border-black"
                >
                    <div className="flex flex-row border-b-2 border-black">
                        <select
                            className="w-1/6 bg-inherit rounded-2xl focus:outline-none text-lg mx-5"
                            name="code_lang"
                            required={true}
                            id="code_lang"
                        >
                            <option value="javascript">Javascript</option>
                            <option value="python">Python</option>
                            <option value="c">C</option>
                            <option value="cpp">C++</option>
                            <option value="java">Java</option>
                            <option value="html">HTML</option>
                            <option value="css">CSS</option>
                            <option value="php">PHP</option>
                            <option value="sql">SQL</option>
                            <option value="ruby">Ruby</option>
                            <option value="go">Go</option>
                            <option value="rust">Rust</option>
                            <option value="kotlin">Kotlin</option>
                            <option value="swift">Swift</option>
                            <option value="typescript">Typescript</option>
                            <option value="dart">Dart</option>
                            <option value="scala">Scala</option>
                            <option value="r">R</option>
                            <option value="perl">Perl</option>
                            <option value="lua">Lua</option>
                            <option value="matlab">Matlab</option>
                            <option value="bash">Bash</option>
                            <option value="powershell">Powershell</option>
                            <option value="elixir">Elixir</option>
                            <option value="clojure">Clojure</option>
                            <option value="julia">Julia</option>
                            <option value="lisp">Lisp</option>
                            <option value="xml">XML</option>
                            <option value="yaml">YAML</option>
                        </select>
                        <Input
                            type="text"
                            placeholder="Enter the file name"
                            required={true}
                            className="mt-2 w-2/6 text-center text-xl focus:outline-none"
                            name="code_title"
                            autoComplete="off"
                            spellCheck="false"
                            id="title"
                        />
                        <Input
                            type="text"
                            placeholder="Author Name"
                            required={true}
                            className="mt-2 w-2/6 text-center text-xl focus:outline-none"
                            name="author"
                            autoComplete="off"
                            spellCheck="false"
                            id="title"
                        />
                        <button
                            className="
                            w-1/6 bg-black text-white rounded-3xl text-xl font-bold p-2 m-2 transform duration-500 hover:scale-105 focus:outline-none
                            "
                            type="submit"
                        >
                            Create
                        </button>
                    </div>
                    <textarea
                        name="content"
                        required={true}
                        id="content"
                        className="w-full focus:outline-none p-1 text-base"
                        rows={20}
                        spellCheck="false"
                        cols={10}
                    ></textarea>
                </form>
            </div>
        </>
    );
}
