import { Box } from '@mui/material';
import bgImage from '../assets/login_bg.png';

export function LoginBackground({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', position: 'relative', overflow: 'hidden' }}>
      {/* Blue BG */}
      <Box sx={{
        position: 'absolute', inset: 0,
        width: { xs: '100%', md: '75%' },
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />

      {/* White panel — right side on desktop only */}
      <Box sx={{
        position: 'absolute', inset: 0,
        left: { xs: '100%', md: '75%' },
        background: '#f1f5f9',
      }} />

      {/* Content */}
      <Box sx={{
        position: 'relative', zIndex: 1,
        width: '100%', minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'center', md: 'center' },
        justifyContent: { xs: 'flex-start', md: 'flex-start' },
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 4, md: 0 },
        gap: { xs: 3, md: 0 },
      }}>
        {children}
      </Box>
    </Box>
  );
}