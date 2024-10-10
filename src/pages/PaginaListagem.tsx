import React, { useEffect, useState } from "react";
import { BarraNavegacao } from "../components/NavegacaoConteudo/NavegacaoConteudo";
import { MenuListagem } from "../components/PaginaConteudo/ConteudoListagem";
import { RodapePaginacao } from "../components/RodapeConteudo/RodapeConteudo";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/slices/PokedexSlice";
import { RootState } from "../store/store";

interface Pokemon {
    id: number;
    name: string;
    image: string;
    height: number;
}

interface BasicPokemon {
    name: string;
    url: string;
}

export function PaginaListagem() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const pokemonsPerPage: number = 18;
    const favoritos: Pokemon[] = useSelector((state: RootState) => state.pokedex.favorites);
    const dispatch = useDispatch();

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const fetchAllPokemons = async () => {
        let allPokemons: BasicPokemon[] = [];
        let nextUrl: string | null = "https://pokeapi.co/api/v2/pokemon?limit=100";

        try {
            while (nextUrl) {
                const response: Response = await fetch(nextUrl);
                const data: { results: BasicPokemon[]; next: string | null } = await response.json();
                allPokemons = [...allPokemons, ...data.results];
                nextUrl = data.next;
            }

            const pokemonDetails = await Promise.all(
                allPokemons.map(async (pokemon: BasicPokemon) => {
                    try {
                        const response: Response = await fetch(pokemon.url);
                        const details = await response.json();
                        return {
                            id: details.id,
                            name: details.name,
                            image: details.sprites.front_default,
                            height: details.height,
                        };
                    } catch (error) {
                        console.error("Erro ao buscar detalhes do Pokémon:", pokemon.name, error);
                        return null;
                    }
                })
            );

            const validPokemons = pokemonDetails.filter((pokemon): pokemon is Pokemon => pokemon !== null);
            setPokemons(validPokemons);
            setFilteredPokemons(validPokemons);

            localStorage.setItem("pokemons", JSON.stringify(validPokemons));
        } catch (error) {
            console.error("Erro ao buscar Pokémons:", error);
        }
    };

    useEffect(() => {
        const storedPokemons = localStorage.getItem("pokemons");
        if (storedPokemons) {
            const parsedPokemons: Pokemon[] = JSON.parse(storedPokemons);
            setPokemons(parsedPokemons);
            setFilteredPokemons(parsedPokemons);
        } else {
            fetchAllPokemons();
        }
    }, []);

    const onSearch = (termo: string) => {
        setSearchTerm(termo);
    };

    useEffect(() => {
        const filtered = pokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPokemons(filtered);
        setCurrentPage(1);
    }, [searchTerm, pokemons]);

    const handleToggleFavorite = (pokemon: Pokemon) => {
        const isFavorito = favoritos.some((fav: Pokemon) => fav.id === pokemon.id);
        if (isFavorito) {
            dispatch(removeFavorite(pokemon.id));
        } else {
            dispatch(addFavorite(pokemon));
        }
    };

    return (
        <div className="container">
            <BarraNavegacao onSearch={onSearch} totalFavoritos={favoritos.length} titulo="Lista de Pokémons" />

            <MenuListagem
                pokemonsFiltrados={filteredPokemons.slice(
                    (currentPage - 1) * pokemonsPerPage,
                    currentPage * pokemonsPerPage
                )}
                favoritos={favoritos}
                onToggleFavorite={handleToggleFavorite}
            />

            <RodapePaginacao
                totalPokemons={filteredPokemons.length}
                pokemonsPerPage={pokemonsPerPage}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        </div>
    );
}
