import { Box, Typography } from '@mui/material';

type StatItemProps = {
  value: string;
  label: string;
};

function StatItem({ value, label }: StatItemProps) {
  return (
    <Box textAlign="center">
      <Typography
        variant="h2"
        sx={{
          fontWeight: 900,
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          color: '#ffffff',
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: 'rgba(255,255,255,0.85)',
          fontWeight: 500,
          fontSize: '1.1rem',
          mt: 0.5,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export function LoginStats() {
  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      sx={{ mt: 6, width: '100%', maxWidth: 600 }}
    >
      <StatItem value="310+" label="Students" />
      <StatItem value="95%" label="Success Rate" />
    </Box>
  );
}