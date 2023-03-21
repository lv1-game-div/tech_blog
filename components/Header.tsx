import { ImTwitter, ImGithub } from "react-icons/im";
import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-slate-900">
            <div className="xl:container xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between text-center py-3">
                <div className="md:flex-none w-96 order-2 sm:order-1 flex justify-center py-4 sm:py-0">
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                </div>
                <div className="shrink w-80 sm:order-2">
                    <Link href={"/"}>
                        <span className="text-white font-bold uppercase text-3xl">Tech Blog</span>
                    </Link>
                </div>
                <div className="w-96 order-3 flex justify-center">
                    <div className="flex gap-6">
                        <Link href="https://twitter.com/devkei5" target="_blank" rel="noopener noreferrer">
                            <ImTwitter color="#888888" />
                        </Link>
                        <Link href="https://github.com/lv1-game-div" target="_blank" rel="noopener noreferrer">
                            <ImGithub color="#888888" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};