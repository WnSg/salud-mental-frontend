import Link from 'next/link';

export default function HomePage() {
    return (
        <main className="main flex items-center justify-center md:h-screen">
            <div className="div-start relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32 text-gray-900">
                <h1>Bienvenido</h1>
                <div className='link-start'>
                    <Link href="/">COMENZAR</Link>
                </div>
            </div>
        </main>
    );
}