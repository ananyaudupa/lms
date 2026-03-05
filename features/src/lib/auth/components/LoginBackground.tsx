import { Box } from '@mui/material';

export function LoginBackground({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', position: 'relative', overflow: 'hidden' }}>
      {/* Dark blue — 72% */}
      <Box
        sx={{
          position: 'absolute', inset: 0,
          width: '65%',
          background: 'linear-gradient(135deg, #0a1628 0%, #0f2460 50%, #0a1628 100%)',
        }}
      />

      {/* White — 28% */}
      <Box
        sx={{
          position: 'absolute', inset: 0,
          left: '65%',
          background: '#f1f5f9',
        }}
      />

      {/* Wave lines */}
      <Box
        sx={{
          position: 'absolute', inset: 0, width: '65%',
          opacity: 0.2,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 900'%3E%3Cpath fill='none' stroke='%234f46e5' stroke-width='1.5' d='M0,400 C200,300 400,500 600,400 S1000,300 1200,400 S1400,500 1440,400'/%3E%3Cpath fill='none' stroke='%2306b6d4' stroke-width='1' d='M0,500 C200,400 400,600 600,500 S1000,400 1200,500 S1400,600 1440,500'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          px: { xs: 2, md: 10 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}