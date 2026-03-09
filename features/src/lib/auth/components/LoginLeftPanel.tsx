import { Box, Typography, Stack } from '@mui/material';

type Props = { studentsImage?: string };

export function LoginLeftPanel({ studentsImage }: Props) {
  return (
    <Box
      sx={{
        display: { xs: 'none', sm: 'flex' }, // hidden on mobile
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        color: '#fff',
        width: { sm: '100%', md: '60%' },
        pl: { sm: 2, md: 6 },
        pt: { sm: 6, md: 0 },
        pb: { sm: 4, md: 0 },
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 400, opacity: 0.8, mb: 1, fontSize: { sm: '1rem', md: '1.5rem' } }}>
        Welcome To
      </Typography>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3, lineHeight: 1.3, fontSize: { sm: '1.4rem', md: '2rem' } }}>
        Synterra's Learning Management System
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.8, lineHeight: 1.9, maxWidth: 520, mb: 4, display: { sm: 'none', md: 'block' } }}>
        Unlock your potential with personalized learning paths, expert-led courses,
        and a community dedicated to your success.
      </Typography>

      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{ width: '100%', maxWidth: 620 }}
      >
        {/* Left stat */}
        <Box textAlign="left" sx={{ minWidth: { sm: 80, md: 100 } }}>
          <Typography variant="h2" fontWeight={700} sx={{ lineHeight: 1, fontSize: { sm: '2rem', md: '3.75rem' } }}>310+</Typography>
          <Typography variant="body1" sx={{ opacity: 0.85, mt: 0.5 }}>Students</Typography>
        </Box>

        {/* Center image — hidden on tablet */}
        {studentsImage && (
          <Box
            component="img"
            src={studentsImage}
            alt="Students"
            sx={{ width: { sm: 280, md: 480 }, display: { sm: 'none', md: 'block' } }}
          />
        )}

        {/* Right stat */}
        <Box textAlign="right" sx={{ minWidth: { sm: 100, md: 130 } }}>
          <Typography variant="h2" fontWeight={700} sx={{ lineHeight: 1, fontSize: { sm: '2rem', md: '3.75rem' } }}>95%</Typography>
          <Typography variant="body1" sx={{ opacity: 0.85, mt: 0.5 }}>Success Rate</Typography>
        </Box>
      </Stack>
    </Box>
  );
}