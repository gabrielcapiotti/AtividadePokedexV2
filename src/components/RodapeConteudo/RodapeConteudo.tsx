import React from 'react';
import { RodapeEstilo } from './RodapeEstilo';
import { useTheme } from '@mui/material/styles';
import { Pagination } from '@mui/material';

interface RodapePaginacaoProps {
    totalPokemons: number;
    pokemonsPerPage: number;
    currentPage: number;
    handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export const RodapePaginacao: React.FC<RodapePaginacaoProps> = ({
    totalPokemons,
    pokemonsPerPage,
    currentPage,
    handlePageChange
}) => {

    const theme = useTheme();

    return (
        <RodapeEstilo
            style={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                transition: 'color 0.3s ease, background-color 0.3s ease'
            }}
        >
            <Pagination
                count={Math.ceil(totalPokemons / pokemonsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                style={{ color: theme.palette.primary.contrastText }}
            />
        </RodapeEstilo>
    );
};
