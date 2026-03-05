import { Box, Typography } from '@mui/material';
import { LoginStats } from './LoginStats';

export function LoginLeftPanel() {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        pr: { xs: 2, md: 4 },
      }}
    >
      <Typography
        sx={{
          color: 'rgba(255,255,255,0.7)',
          fontWeight: 400,
          fontSize: { xs: '1.1rem', md: '1.3rem' },
          mb: 1,
        }}
      >
        Welcome To
      </Typography>

      <Typography
        variant="h3"
        sx={{
          color: '#ffffff',
          fontWeight: 700,
          mb: 3,
          fontSize: { xs: '1.8rem', md: '2.2rem' },
          lineHeight: 1.3,
        }}
      >
        Synterra's Learning<br />Management System
      </Typography>

      <Typography
        sx={{
          color: 'rgba(255,255,255,0.75)',
          fontSize: { xs: '1rem', md: '1.1rem' },
          lineHeight: 1.9,
          maxWidth: 500,
        }}
      >
        Unlock your potential with personalized learning paths, expert-led courses,
        and a community dedicated to your success.
      </Typography>

      <LoginStats />

      {/* Student image — replace tomorrow */}
      {/* <Box component="img" src={studentsImage} alt="Students" sx={{ width: 340, mt: 4 }} /> */}
    </Box>
  );
}