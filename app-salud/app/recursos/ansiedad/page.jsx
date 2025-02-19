import Anxiety from "@/app/components/Anxiety";
export default function AnxietyPage() {
    return (
        <main className="main flex items-center justify-center md:h-screen">
            <div className="div-start relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32 text-gray-900">
                <Anxiety/>
                
            </div>
        </main>
    );
}