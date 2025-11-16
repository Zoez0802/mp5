import ShortenForm from "@/components/ShortenForm";

{/*in terms of styling, i using 'slate' for neutral background/color*/}

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#d8f5e5] to-[#b9e6f9] text-slate-900">{/*// uses text-slate for neutral gray text*/}
            {/* Header */}
            <header className="w-full backdrop-blur-md bg-white/70 border-b border-slate-200 shadow-sm">
                <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
                    <h1 className="font-title text-2xl tracking-tight text-slate-900">
                        CS391 URL Shortener
                    </h1>
                    <span className="text-xs font-mono text-slate-500">
                        built by Minjie Zuo
                    </span>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 pt-16 pb-12 flex flex-col items-center">
                {/* Title */}
                <h2 className="font-title text-4xl mb-2 tracking-tight text-slate-800">
                    Create Short Links
                </h2>

                <p className="text-sm text-slate-600 mb-10 text-center max-w-lg">
                    Paste any long URL, choose a custom alias, and generate a short, shareable link.
                </p>


                <div className="w-full max-w-2xl rounded-2xl border border-white/50 bg-white/80 backdrop-blur-xl shadow-xl p-10 transition hover:shadow-2xl hover:bg-white/90">
                    <h3 className="text-xl font-semibold mb-1">Shorten a URL</h3>
                    <p className="text-xs text-slate-600 mb-5">
                        Give your link a custom name
                    </p>

                    <div className="flex justify-center">
                        <ShortenForm />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full text-center py-6 text-xs text-slate-500">
                &copy; 2025 CS391 – MP5
            </footer>

        </div>
    );
}
