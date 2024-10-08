import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../../store/models/Hooks";
import { ThemeProvider } from "@mui/material";
import DarkTheme from "./DarkTheme";
import { LightTheme } from "./LightTheme";

interface MyThemeProps {
    children: ReactNode;
}

export const MyTheme: React.FC<MyThemeProps> = ({ children }) => {
    const themeRedux = useAppSelector((state) => state.theme.theme);

    useEffect(() => {
        console.log("Tema Atual", themeRedux);
    }, [themeRedux]);

    return (
        <ThemeProvider theme={themeRedux === "dark" ? DarkTheme : LightTheme}>
            {children}
        </ThemeProvider>
    );
};
