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

const initialState: PokedexState = {
    favorites: JSON.parse(localStorage.getItem('favoritos') || '[]'),
};

const PokedexSlice = createSlice({
    name: 'pokedex',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Pokemon>) => {
            const exists = state.favorites.some(pokemon => pokemon.id === action.payload.id);
            if (!exists) {
                state.favorites.push(action.payload);
                localStorage.setItem('favoritos', JSON.stringify(state.favorites));
            }
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.favorites = state.favorites.filter(pokemon => pokemon.id !== action.payload);
            localStorage.setItem('favoritos', JSON.stringify(state.favorites));
        }
    }
});

export const { addFavorite, removeFavorite } = PokedexSlice.actions;
export default PokedexSlice.reducer;
