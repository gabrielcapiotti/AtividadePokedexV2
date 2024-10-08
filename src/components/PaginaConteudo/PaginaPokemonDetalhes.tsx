import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';
import { ConteudoEstiloV2 } from '../PaginaConteudo/ConteudoEstilo';
import { RodapeEstilo } from '../RodapeConteudo/RodapeEstilo';
import { BarraNavegacao } from '../NavegacaoConteudo/NavegacaoConteudo';

interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: { ability: { name: string } }[];
    types: { type: { name: string } }[];
    sprites: { front_default: string };
}

export const DetalhesPokemon: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
    const theme = useTheme();

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            setPokemon(data);
        };

        fetchPokemonDetails();
    }, [id]);

    if (!pokemon) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            <BarraNavegacao onSearch={() => { }} totalFavoritos={0} titulo={pokemon.name} />

            <ConteudoEstiloV2
                style={{
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.default,
                    transition: 'color 0.3s ease, background-color 0.3s ease',
                    padding: '20px',
                    height: "65.9vh"
                }}
            >
                <Box display="flex" flexDirection="column" alignItems="center">
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <Typography variant="h4" gutterBottom>
                        {pokemon.name}
                    </Typography>
                    <Typography variant="body1">ID: {pokemon.id}</Typography>
                    <Typography variant="body1">Altura: {pokemon.height} dm</Typography>
                    <Typography variant="body1">Peso: {pokemon.weight} hg</Typography>
                    <Typography variant="h6">Habilidades:</Typography>
                    <ul>
                        {pokemon.abilities.map((ability, index) => (
                            <li key={index}>{ability.ability.name}</li>
                        ))}
                    </ul>
                    <Typography variant="h6">Tipos:</Typography>
                    <ul>
                        {pokemon.types.map((type, index) => (
                            <li key={index}>{type.type.name}</li>
                        ))}
                    </ul>
                </Box>
            </ConteudoEstiloV2>

            <RodapeEstilo
                style={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    transition: 'background-color 0.3s ease, color 0.3s ease',
                    height: "20vh",
                }}
            >
                <p>Todos os direitos reservados © Pokedex</p>
            </RodapeEstilo>
        </>
    );
};
