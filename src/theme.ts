import { createTheme } from '@mui/material/styles';

// check what MUI theme properties are available by default: https://mui.com/material-ui/customization/default-theme/

// To extend MUI theme with your own properties that are not included by default
// e.g., adding a 'exphighlight' color to the background palette, you need to use module augmentation
// as shown below:
declare module '@mui/material/styles' {
    interface TypeBackground {
        exphighlight: string;
    }
    interface PaletteColor {
        // Add your custom property to the PaletteColor interface (for reading the value)
        textColor1?: string;
        textColor2?: string;
        chipBorderColor1?: string;
    }

    interface SimplePaletteColorOptions {
        // Add your custom property to the SimplePaletteColorOptions interface (as input when call createTheme function)
        textColor1?: string;
        textColor2?: string;
        chipBorderColor1?: string;
    }
}

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#b48334ff',
            textColor1: '#69607dff',
            textColor2: '#487c63ff',
            chipBorderColor1: '#d4cec1ff',
        },
        background: {
            default: '#729dcbff',
            paper: '#c6c9c6ff',
            exphighlight: '#bdae93ff',
        },
    },
    typography: {
        fontFamily: '"fkGrotesk", "Noto Sans JP", sans-serif',
        h4: {
            fontFamily: 'dynapuff',
            fontSize: '1.7em',
        },
    },
});