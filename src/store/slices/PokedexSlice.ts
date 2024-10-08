import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Pokemon {
    id: number;
    name: string;
    image: string;
    height: number;
}

interface PokedexState {
    favorites: Pokemon[];
}

const loadFavoritesFromLocalStorage = (): Pokemon[] => {
    if (typeof window !== 'undefined') {
        try {
            const storedFavorites = localStorage.getItem('favoritos');
            return storedFavorites ? JSON.parse(storedFavorites) : [];
        } catch (error) {
            console.error('Erro ao carregar favoritos do localStorage:', error);
            return [];
        }
    }
    return [];
};

const initialState: PokedexState = {
    favorites: loadFavoritesFromLocalStorage(),
};

const PokedexSlice = createSlice({
    name: 'pokedex',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Pokemon>) => {
            const exists = state.favorites.some(pokemon => pokemon.id === action.payload.id);
            if (!exists) {
                state.favorites.push(action.payload);
                if (typeof window !== 'undefined') {
                    localStorage.setItem('favoritos', JSON.stringify(state.favorites));
                }
            }
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.favorites = state.favorites.filter(pokemon => pokemon.id !== action.payload);
            if (typeof window !== 'undefined') {
                localStorage.setItem('favoritos', JSON.stringify(state.favorites));
            }
        }
    }
});

export const { addFavorite, removeFavorite } = PokedexSlice.actions;
export default PokedexSlice.reducer;
