import { Box, Typography, Stack } from '@mui/material';

type Props = { studentsImage?: string };

export function LoginLeftPanel({ studentsImage }: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', color: '#fff' }}>
      <Typography variant="h5" sx={{ fontWeight: 400, opacity: 0.8, mb: 1 }}>
        Welcome To
      </Typography>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3, lineHeight: 1.3 }}>
        Synterra's Learning Management System
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.8, lineHeight: 1.9, maxWidth: 520, mb: 5 }}>
        Unlock your potential with personalized learning paths, expert-led courses,
        and a community dedicated to your success.
      </Typography>

      {/* Stats + Image row */}
      <Stack direction="row" alignItems="flex-end" justifyContent="space-between" sx={{ width: '100%', maxWidth: 560 }}>
        <Box textAlign="center">
          <Typography variant="h2" fontWeight={700} sx={{ lineHeight: 1 }}>310+</Typography>
          <Typography variant="body1" sx={{ opacity: 0.85, mt: 0.5 }}>Students</Typography>
        </Box>

        {studentsImage && (
          <Box
            component="img"
            src={studentsImage}
            alt="Students"
            sx={{ width: 350, objectFit: 'contain' }}
          />
        )}

        <Box textAlign="center">
          <Typography variant="h2" fontWeight={700} sx={{ lineHeight: 1 }}>95%</Typography>
          <Typography variant="body1" sx={{ opacity: 0.85, mt: 0.5 }}>Success Rate</Typography>
        </Box>
      </Stack>
    </Box>
  );
}