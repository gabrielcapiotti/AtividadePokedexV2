import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../store/models/Hooks";
import { PokemonCard } from "../CardPokemon/CardConteudo";
import { removeFavorite } from "../../store/slices/PokedexSlice";
import { ConteudoEstiloV2 } from "../PaginaConteudo/ConteudoEstilo";
import { RodapeEstilo } from "../RodapeConteudo/RodapeEstilo";
import { BarraNavegacao } from "../NavegacaoConteudo/NavegacaoConteudo";

export const Pokedex: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const favoritos = useAppSelector((state) => state.pokedex.favorites);
    const dispatch = useAppDispatch();
    const theme = useTheme();

    const handleRemoveFavorite = (pokemonId: number) => {
        dispatch(removeFavorite(pokemonId));
    };

    const handleSearch = (termo: string) => {
        setSearchTerm(termo.toLowerCase());
    };

    const favoritosFiltrados = favoritos.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm)
    );

    return (
        <>
            <BarraNavegacao
                onSearch={handleSearch}
                totalFavoritos={favoritos.length}
                titulo="Pokedex"
            />

            <ConteudoEstiloV2
                style={{
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.default,
                    transition: "color 0.3s ease, background-color 0.3s ease",
                    padding: "20px",
                }}
            >
                <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
                    {favoritosFiltrados.length > 0 ? (
                        favoritosFiltrados.map((pokemon) => (
                            <PokemonCard
                                key={pokemon.id}
                                pokemon={pokemon}
                                isFavorite={true}
                                onToggleFavorite={() => handleRemoveFavorite(pokemon.id)}
                            />
                        ))
                    ) : (
                        <p>Você ainda não favoritou nenhum Pokémon.</p>
                    )}
                </Box>
            </ConteudoEstiloV2>

            <RodapeEstilo
                style={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    transition: "background-color 0.3s ease, color 0.3s ease",
                    textAlign: "center",
                    padding: "10px 0",
                }}
            >
                <p>Todos os direitos reservados © Pokedex</p>
            </RodapeEstilo>
        </>
    );
};
