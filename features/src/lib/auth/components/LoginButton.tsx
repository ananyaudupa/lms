import { Button, Box, CircularProgress } from '@mui/material';

type Props = { loading: boolean; formId: string };

export function LoginButton({ loading, formId }: Props) {
  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {/* Left fold — hidden on xs */}
      <Box sx={{
        display: { xs: 'none', sm: 'block' },
        position: 'absolute', left: '0px', bottom: -18,
        height: '40%', width: '22px',
        background: '#0008af',
        clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
        zIndex: 0, transform: 'rotate(-90deg)',
      }} />
      {/* Right fold — hidden on xs */}
      <Box sx={{
        display: { xs: 'none', sm: 'block' },
        position: 'absolute', right: '1px', bottom: -18,
        height: '40%', width: '22px',
        background: '#0284a8',
        clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
        zIndex: 0, transform: 'rotate(90deg)',
      }} />

      <Button
        type="submit"
        form={formId}
        variant="contained"
        disabled={loading}
        fullWidth
        sx={{
          position: 'relative', zIndex: 1,
          py: { xs: 1.5, sm: 2 },
          borderRadius: 2,
          background: 'linear-gradient(90deg, #0f48ee, #04aefb)',
          fontWeight: 700,
          fontSize: { xs: 14, sm: 16 },
          textTransform: 'none',
          boxShadow: '0 4px 20px rgba(37,99,235,0.4)',
          '&:hover': { background: 'linear-gradient(90deg, #1d4ed8, #0891b2)', boxShadow: 'none' },
          '&.Mui-disabled': { background: '#e2e8f0' },
        }}
      >
        {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Log In'}
      </Button>
    </Box>
  );
}