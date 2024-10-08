import { InputBase } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import styled from 'styled-components';
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from '@mui/material/styles';
import React from 'react';

// Barra de navegação
export const BarraNavegacaoEstilo = styled(AppBar)`
    display: flex;
    background-color: #2865d7;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    padding: 0 20px; 
    width: 100vw;
    height: 15vh;
`;

// Campo de pesquisa 
export const TextoNavegador = styled.div<{ $backgroundColor: string }>`
    display: flex;
    width: 70vw;
    height: 20px;
    font-size: 1rem;
    background: none;
    border: 1px solid black;
    border-radius: 15px;
    outline: none;
    padding: 8px;
    margin-left: 40px;
    color: #ffffff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;
    background-color: ${(props) => props.$backgroundColor};
    
    &:hover {
        background-color: #a9a9a9; 
    }
`;

// Icone de pesquisa
export const IconePesquisa = styled.div`
    display: flex;
    align-items: center;
    padding-right: 10px; 
    color: black;
`;

// Campo de entrada
export const CampoEntrada = styled(InputBase)`
  color: inherit;
  padding: 8px; 
  width: 100%;
  font-size: 1rem; 
  background: none;
  border: none; 
  outline: none; 
  height: 100%;
`;

export function ComponentePesquisa({ onSearch }: { onSearch: (termoBusca: string) => void }) {
    const theme = useTheme();
    const [termoBusca, setTermoBusca] = React.useState<string>('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const termo = event.target.value;
        setTermoBusca(termo);
        onSearch(termo);
    };

    return (
        <TextoNavegador $backgroundColor={theme.palette.background.default}>
            <IconePesquisa>
                <SearchIcon style={{ color: theme.palette.text.primary }} />
            </IconePesquisa>
            <CampoEntrada
                placeholder="Buscar..."
                inputProps={{ 'aria-label': 'search' }}
                value={termoBusca}
                onChange={handleSearchChange}
                style={{
                    color: theme.palette.text.primary,
                    transition: 'color 0.3s ease',
                }}
            />
        </TextoNavegador>
    );
}
