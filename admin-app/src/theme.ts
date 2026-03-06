import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: '"Cal Sans", sans-serif',
    h1: { fontFamily: '"Cal Sans", sans-serif' },
    h2: { fontFamily: '"Cal Sans", sans-serif' },
    h3: { fontFamily: '"Cal Sans", sans-serif' },
    h4: { fontFamily: '"Cal Sans", sans-serif' },
    h5: { fontFamily: '"Cal Sans", sans-serif' },
    h6: { fontFamily: '"Cal Sans", sans-serif' },
    body1: { fontFamily: '"Cal Sans", sans-serif' },
    body2: { fontFamily: '"Cal Sans", sans-serif' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * {
          font-family: "Cal Sans", sans-serif !important;
        }
      `,
    },
  },
});