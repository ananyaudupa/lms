import { Box } from '@mui/material';
import { LoginForm } from './LoginForm';

export function LoginCard() {
  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        flexShrink: 0,
        width: { xs: '100%', md: 440 },
      }}
    >
      <Box
        sx={{
          background: '#e8edf2',
          borderRadius: 4,
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          p: { xs: 4, md: 5 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LoginForm />
      </Box>
    </Box>
  );
}