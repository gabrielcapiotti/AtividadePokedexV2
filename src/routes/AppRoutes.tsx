import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PaginaListagem } from '../pages/PaginaListagem';
import { Pokedex } from '../components/PaginaConteudo/PokemonsFavoritos';
import { DetalhesPokemon } from '../components/PaginaConteudo/PaginaPokemonDetalhes'; // Componente para detalhes

export const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<PaginaListagem />}
                />
                <Route
                    path="/pokedex"
                    element={<Pokedex />}
                />
                <Route
                    path="/pokemon/:id"
                    element={<DetalhesPokemon />}
                />
            </Routes>
        </Router>
    );
};
