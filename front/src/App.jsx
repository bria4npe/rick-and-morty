import { Routes, Route } from "react-router-dom";

import { CharacterListPage } from "./pages/CharacterListPage";
import { CharacterDetailPage } from "./pages/CharacterDetailPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="py-8 text-center">
        <h1 className="text-3xl font-bold text-green-400">Rick & Morty</h1>
        <p className="mt-1 text-gray-400">Explorador de personajes</p>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-12">
        <Routes>
          <Route path="/" element={<CharacterListPage />} />
          <Route path="/characters/:id" element={<CharacterDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}
