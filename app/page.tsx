"use client";
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Portal Imobiliário</h1>
          <div className="space-x-4">
            <a href="#" className="text-gray-600">Buscar</a>
            <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded">Anunciar</a>
          </div>
        </nav>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8">Encontre seu próximo imóvel</h2>
        <div className="bg-white p-6 rounded shadow">
             <input type="text" placeholder="Digite cidade ou bairro..." className="w-full p-3 border rounded" />
        </div>
      </main>
    </div>
  );
}

