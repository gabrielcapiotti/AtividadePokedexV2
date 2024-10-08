import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
    theme: 'light' | 'dark';
}

const getInitialTheme = (): ThemeState => {
    if (typeof window !== 'undefined') {
        const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
        if (storedTheme) {
            return { theme: storedTheme };
        }
    }
    return { theme: 'light' };
}

const initialState: ThemeState = getInitialTheme();

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', state.theme);
            }
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
