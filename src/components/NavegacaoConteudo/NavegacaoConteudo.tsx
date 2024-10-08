import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Tooltip, Badge } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { toggleTheme } from '../../store/slices/ThemeSlices';
import { ComponentePesquisa } from '../NavegacaoConteudo/NavegacaoEstilo';
import { useNavigate, useLocation } from 'react-router-dom';
import PokeballIcon from '../../assets/pokebola.png';

interface BarraNavegacaoProps {
    onSearch: (termoBusca: string) => void;
    totalFavoritos: number;
    titulo: string;
}

export const BarraNavegacao: React.FC<BarraNavegacaoProps> = React.memo(({ onSearch, totalFavoritos, titulo }) => {
    const tema = useSelector((state: RootState) => state.theme.theme);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    const handleBack = () => {
        navigate(-1);
    };

    const showMenuIcon = location.pathname === '/';

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    transition: 'background-color 0.3s ease, color 0.3s ease',
                    backgroundColor: tema === 'light' ? '#b70000' : '#001d65',
                    color: tema === 'light' ? '#fff' : '#fff',
                }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label={showMenuIcon ? "Abrir menu" : "Voltar"}
                        onClick={showMenuIcon ? undefined : handleBack}
                        sx={{ mr: 2 }}
                    >
                        {showMenuIcon ? <MenuIcon /> : <ArrowBackIcon />}
                    </IconButton>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            transition: 'color 0.3s ease',
                        }}
                    >
                        {titulo}
                    </Typography>

                    {showMenuIcon && <ComponentePesquisa onSearch={onSearch} />}

                    <Box sx={{ flexGrow: 1 }} />

                    <Tooltip title="Ver Pokedex">
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label={`Ver seus favoritos, ${totalFavoritos} no total`}
                            onClick={() => navigate("/pokedex")}
                        >
                            <Badge badgeContent={totalFavoritos} color="error">
                                <img src={PokeballIcon} alt="Pokébola" style={{ width: '24px', height: '24px' }} />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Alternar Tema">
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label={tema === 'light' ? "Alternar para o modo escuro" : "Alternar para o modo claro"}
                            onClick={handleToggleTheme}
                        >
                            {tema === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </Box>
    );
});
