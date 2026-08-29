"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-extrabold text-blue-700 tracking-tight">
            NextProperty
          </a>
          <div className="flex items-center gap-6">
            <a href="/search" className="text-neutral-600 hover:text-blue-700 transition">Buscar</a>
            <a href="/list" className="bg-blue-700 text-white px-5 py-2.5 rounded-lg hover:bg-blue-800 transition font-medium shadow-sm">
              Anunciar Imóvel
            </a>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold tracking-tighter text-neutral-950 mb-6">
            Encontre o seu próximo lar, <br />
            <span className="text-blue-700">com inteligência e agilidade.</span>
          </h1>
          <div className="max-w-3xl mx-auto bg-white p-4 rounded-2xl shadow-lg border border-neutral-100 flex gap-2">
            <input 
              type="text" 
              placeholder="Ex: São Paulo, Jardins..." 
              className="flex-grow p-4 bg-transparent focus:outline-none text-lg" 
            />
            <button className="bg-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-800 transition">
              Buscar
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

