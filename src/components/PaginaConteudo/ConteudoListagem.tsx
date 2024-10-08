import React from 'react';
import { ConteudoEstilo } from "./ConteudoEstilo";
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { PokemonCard } from '../CardPokemon/CardConteudo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addFavorite, removeFavorite } from '../../store/slices/PokedexSlice';

interface Pokemon {
    id: number;
    name: string;
    image: string;
    height: number;
}

interface MenuListagemProps {
    pokemonsFiltrados: Pokemon[];
    favoritos: Pokemon[];
    onToggleFavorite: (pokemon: Pokemon) => void;
}

const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
    justify-items: center;
    width: 90vw;
`;

export const MenuListagem: React.FC<MenuListagemProps> = ({ pokemonsFiltrados }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const favoritos = useSelector((state: RootState) => state.pokedex.favorites);

    const isFavorite = (pokemon: Pokemon) => favoritos.some(fav => fav.id === pokemon.id);

    const handleToggleFavorite = (pokemon: Pokemon) => {
        if (isFavorite(pokemon)) {
            dispatch(removeFavorite(pokemon.id));
        } else {
            dispatch(addFavorite(pokemon));
        }
    };

    return (
        <ConteudoEstilo
            style={{
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.default,
                transition: 'color 0.3s ease, background-color 0.3s ease',
                padding: '20px',
            }}
        >
            {pokemonsFiltrados.length > 0 ? (
                <CardsContainer>
                    {pokemonsFiltrados.map((pokemon) => (
                        <PokemonCard
                            key={pokemon.id}
                            pokemon={pokemon}
                            isFavorite={isFavorite(pokemon)}
                            onToggleFavorite={() => handleToggleFavorite(pokemon)}
                        />
                    ))}
                </CardsContainer>
            ) : (
                <p>Nenhum Pokémon encontrado.</p>
            )}
        </ConteudoEstilo>
    );
};
