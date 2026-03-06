import { Box, Typography, Stack } from '@mui/material';

type Props = { studentsImage?: string };

export function LoginLeftPanel({ studentsImage }: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', color: '#fff', width: '100%', pl: 6 }}>
      <Typography variant="h5" sx={{ fontWeight: 400, opacity: 0.8, mb: 1 }}>
        Welcome To
      </Typography>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3, lineHeight: 1.3 }}>
        Synterra's Learning Management System
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.8, lineHeight: 1.9, maxWidth: 520, mb: 4 }}>
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
        <Box textAlign="left" sx={{ minWidth: 100 }}>
          <Typography variant="h2" fontWeight={700} sx={{ lineHeight: 1 }}>310+</Typography>
          <Typography variant="body1" sx={{ opacity: 0.85, mt: 0.5 }}>Students</Typography>
        </Box>

        {/* Center image */}
        {studentsImage && (
          <Box
            component="img"
            src={studentsImage}
            alt="Students"
            sx={{ width: 480, display: 'block' }}
          />
        )}

        {/* Right stat */}
        <Box textAlign="right" sx={{ minWidth: 130 }}>
          <Typography variant="h2" fontWeight={700} sx={{ lineHeight: 1 }}>95%</Typography>
          <Typography variant="body1" sx={{ opacity: 0.85, mt: 0.5 }}>Success Rate</Typography>
        </Box>
      </Stack>
    </Box>
  );
}