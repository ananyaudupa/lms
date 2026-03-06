import { Box } from '@mui/material';
import bgImage from '../assets/login_bg.png';

export function LoginBackground({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', position: 'relative', overflow: 'hidden' }}>
      {/* PNG background image — 75% */}
      <Box
        sx={{
          position: 'absolute', inset: 0,
          width: '75%',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* White — 25% */}
      <Box
        sx={{
          position: 'absolute', inset: 0,
          left: '75%',
          background: '#f1f5f9',
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