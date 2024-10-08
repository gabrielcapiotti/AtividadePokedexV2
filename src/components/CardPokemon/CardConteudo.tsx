import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Button } from "@mui/material";
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useTheme } from '@mui/material/styles';

interface Pokemon {
    id: number;
    name: string;
    image: string;
    height: number;
}

interface PokemonCardProps {
    pokemon: Pokemon;
    isFavorite: boolean;
    onToggleFavorite: (pokemon: Pokemon) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, isFavorite, onToggleFavorite }) => {
    const theme = useTheme();

    return (
        <Card sx={{ height: "350px", backgroundColor: theme.palette.background.paper }}>
            <CardMedia
                component="img"
                height="140px"
                image={pokemon.image || 'https://via.placeholder.com/140'}
                alt={pokemon.name}
            />
            <CardContent>
                <Typography variant="h6" color={theme.palette.text.primary}>
                    {pokemon.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ID: {pokemon.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Tamanho: {pokemon.height} dm
                </Typography>

                <IconButton onClick={() => onToggleFavorite(pokemon)} color="primary">
                    {isFavorite ? (
                        <FavoriteIcon style={{ color: theme.palette.primary.main }} />
                    ) : (
                        <FavoriteBorderIcon style={{ color: theme.palette.text.primary }} />
                    )}
                </IconButton>

                <Button
                    component={Link}
                    to={`/pokemon/${pokemon.id}`}
                    variant="contained"
                    sx={{
                        marginTop: '10px',
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                >
                    Detalhes
                </Button>
            </CardContent>
        </Card>
    );
};
