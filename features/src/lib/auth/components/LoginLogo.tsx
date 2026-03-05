import { Box, Typography } from '@mui/material';

export function LoginLogo() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={1}>
      <Box
        sx={{
          width: 56, height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          mb: 1,
          boxShadow: '0 4px 16px rgba(79,70,229,0.4)',
        }}
      >
        <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: 22 }}>S</Typography>
      </Box>
      <Typography sx={{ fontWeight: 800, fontSize: 22, color: '#1a1a2e' }}>
        Synterra
      </Typography>
    </Box>
  );
}