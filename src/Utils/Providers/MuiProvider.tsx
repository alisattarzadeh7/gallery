import {CacheProvider} from "@emotion/react"
import React, {ReactElement} from "react"
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import {JSXElement} from "@babel/types";
import {useAppSelector} from "~/src/Utils/Hooks";
import useIsRtl from "~/src/Utils/Hooks/useIsRtl";
import {createTheme, ThemeProvider} from "@mui/material";

interface IMuiProviderProps {
    children: ReactElement
}

const theme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: "#1976d270",
                },
            },
        },
    },
});


const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
    key: 'muiltr',
    stylisPlugins: [prefixer],
});


const MuiProvider: React.FC<IMuiProviderProps> = ({children}) => {

    const isRtl = useIsRtl()

    return (
        <ThemeProvider theme={theme}>
            <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
                {children}
            </CacheProvider>
        </ThemeProvider>
    )
}

export default MuiProvider