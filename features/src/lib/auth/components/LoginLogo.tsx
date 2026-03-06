import { Box } from '@mui/material';
import synterraLogo from '../assets/logo.png';

export function LoginLogo() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={1}>
      <Box
        component="img"
        src={synterraLogo}
        alt="Synterra"
        sx={{ width: 160, objectFit: 'contain' }}
      />
    </Box>
  );
}