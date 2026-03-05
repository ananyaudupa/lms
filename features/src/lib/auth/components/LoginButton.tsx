import { Button, CircularProgress } from '@mui/material';

type Props = { loading: boolean };

export function LoginButton({ loading }: Props) {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={loading}
      sx={{
        width: '100%',
        py: 2,
        borderRadius: '0 0 16px 16px',
        background: 'linear-gradient(90deg, #2563eb, #06b6d4)',
        fontWeight: 700,
        fontSize: 16,
        textTransform: 'none',
        boxShadow: 'none',
        flexShrink: 0,
        '&:hover': {
          background: 'linear-gradient(90deg, #1d4ed8, #0891b2)',
          boxShadow: 'none',
        },
        '&.Mui-disabled': { background: '#e2e8f0' },
      }}
    >
      {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Log In'}
    </Button>
  );
}