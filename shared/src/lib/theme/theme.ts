import { createTheme } from '@mui/material/styles';
import { tokens } from './tokens.js';

export const theme = createTheme({
  typography: {
    fontFamily: '"Cal Sans", sans-serif',
  },
  palette: {
    primary: {
      main: tokens.primary,
      dark: tokens.primaryDark,
    },
    secondary: {
      main: tokens.secondary,
    },
    background: {
      default: tokens.pageBg,
    },
    text: {
      primary: tokens.textPrimary,
      secondary: tokens.textMuted,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * { font-family: "Cal Sans", sans-serif !important; }
      `,
    },
  },
});