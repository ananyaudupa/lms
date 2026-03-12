import { Box, Typography } from '@mui/material';

type Props = { studentsImage?: string };

export function LoginLeftPanel({ studentsImage }: Props) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: { xs: 'center', md: 'flex-start' },
      textAlign: { xs: 'center', md: 'left' },
      color: '#fff',
      width: { xs: '100%', md: '60%' },
      pl: { xs: 0, md: 6 },
      pt: { xs: 2, md: 0 },
      pb: { xs: 2, md: 0 },
    }}>
      {/* Welcome text */}
      <Typography sx={{
        fontWeight: 400, opacity: 0.8, mb: 1,
        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.5rem' },
      }}>
        Welcome To
      </Typography>

      <Typography fontWeight={700} sx={{
        mb: { xs: 1.5, md: 3 }, lineHeight: 1.3,
        fontSize: { xs: '1.3rem', sm: '1.5rem', md: '2rem' },
      }}>
        Synterra's Learning Management System
      </Typography>

      {/* Description — hidden on mobile */}
      <Typography sx={{
        opacity: 0.8, lineHeight: 1.9, maxWidth: 520, mb: 4,
        display: { xs: 'none', md: 'block' },
        fontSize: '1rem',
      }}>
        Unlock your potential with personalized learning paths, expert-led courses,
        and a community dedicated to your success.
      </Typography>

      {/* Stats row + image */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: { xs: 'center', md: 'space-between' },
        gap: { xs: 4, md: 0 },
        width: '100%',
        maxWidth: { xs: 320, md: 620 },
      }}>
        {/* Left stat */}
        <Box textAlign={{ xs: 'center', md: 'left' }}>
          <Typography fontWeight={700} sx={{
            lineHeight: 1,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3.75rem' },
          }}>310+</Typography>
          <Typography sx={{ opacity: 0.85, mt: 0.5, fontSize: { xs: '0.85rem', md: '1rem' } }}>
            Students
          </Typography>
        </Box>

        {/* Center image — desktop only */}
        {studentsImage && (
          <Box
            component="img"
            src={studentsImage}
            alt="Students"
            sx={{
              display: { xs: 'none', md: 'block' },
              width: { md: 400, lg: 480 },
            }}
          />
        )}

        {/* Right stat */}
        <Box textAlign={{ xs: 'center', md: 'right' }}>
          <Typography fontWeight={700} sx={{
            lineHeight: 1,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3.75rem' },
          }}>95%</Typography>
          <Typography sx={{ opacity: 0.85, mt: 0.5, fontSize: { xs: '0.85rem', md: '1rem' } }}>
            Success Rate
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}