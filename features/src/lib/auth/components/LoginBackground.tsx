import { Box } from '@mui/material';
import bgImage from '../assets/login_bg.png';

export function LoginBackground({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', position: 'relative', overflow: 'hidden' }}>
      {/* Blue BG — full width on mobile/tablet, 75% on desktop */}
      <Box
        sx={{
          position: 'absolute', inset: 0,
          width: { xs: '100%', md: '75%' },
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* White panel — hidden on mobile, 25% on desktop */}
      <Box
        sx={{
          position: 'absolute', inset: 0,
          left: { xs: '100%', md: '75%' },
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
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          px: { xs: 2, sm: 4, md: 10 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}