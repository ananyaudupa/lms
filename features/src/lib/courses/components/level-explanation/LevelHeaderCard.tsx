import { Box, Typography, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { tokens } from '@org/shared';
import type { LevelExplanationData } from '../../data/explanation.data';

type Props = {
  data: LevelExplanationData;
  onBack: () => void;
};

export function LevelHeaderCard({ data, onBack }: Props) {
  const borderColor = data.passed ? '#22c55e' : '#ef4444';

  return (
    <Box sx={{
      background: '#fff', borderRadius: 3,
      border: `2px solid ${borderColor}`,
      borderTop: `6px solid ${borderColor}`,
      p: { xs: '16px', sm: '24px 28px' },
      mb: 3,
      boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
    }}>

      {/* Title row */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 2, sm: 3 }, flexWrap: 'wrap', gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box component="button" onClick={onBack} sx={{
            width: 42, height: 42, borderRadius: 2,
            background: '#f1f5f9', border: '1px solid #e2e8f0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', '&:hover': { background: '#e2e8f0' },
          }}>
            <ArrowBackIcon sx={{ fontSize: 20, color: '#475569' }} />
          </Box>
          <Typography fontWeight={900} color={tokens.primary} letterSpacing={1}
            sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' } }}>
            LEVEL {data.level}
          </Typography>
        </Box>

        <Chip
          label={data.passed ? `Passed ${data.userScore}%` : `Failed ${data.userScore}%`}
          sx={{
            background: 'transparent', border: `2px solid ${borderColor}`,
            color: data.passed ? '#16a34a' : '#dc2626',
            fontWeight: 700, fontSize: { xs: 12, sm: 14 },
            height: 36, px: 1, borderRadius: 5,
          }}
        />
      </Box>

      {/* Stats row */}
      <Box sx={{ display: 'flex', gap: { xs: 3, sm: 8 }, mb: 2.5, flexWrap: 'wrap' }}>
        {[
          { label: 'Passing Score', value: data.passingScore, suffix: '%' },
          { label: 'Attempt Taken', value: data.attemptsTaken, suffix: '' },
          { label: 'Time Allocated', value: data.timeAllocated, suffix: 'min' },
        ].map(({ label, value, suffix }) => (
          <Box key={label}>
            <Typography fontSize={13} color="#94a3b8" fontWeight={500} mb={0.5}>{label}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
              <Typography fontWeight={900} color="#0f172a" lineHeight={1}
                sx={{ fontSize: { xs: '1.5rem', sm: '2.25rem' } }}>
                {value}
              </Typography>
              {suffix && (
                <Typography fontWeight={600} color="#64748b"
                  sx={{ fontSize: { xs: 13, sm: 18 } }}>
                  {suffix}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Dates row */}
      <Box sx={{
        display: 'flex', alignItems: 'flex-start', gap: 1,
        pt: 2, borderTop: '1px solid #f1f5f9',
        flexDirection: { xs: 'column', sm: 'row' },
      }}>
        <CalendarTodayIcon sx={{ fontSize: 18, color: '#94a3b8', mt: { xs: 0, sm: 0 } }} />
        <Typography fontSize={13} color="#475569">
          <Box component="span" fontWeight={700}>Started: </Box>
          {data.startedDate}&nbsp;&nbsp;{data.startedTime}
        </Typography>
        <Typography color="#d1d5db" sx={{ display: { xs: 'none', sm: 'block' } }} mx={1}>|</Typography>
        <Typography fontSize={13} color="#475569">
          <Box component="span" fontWeight={700}>Completed: </Box>
          {data.completedDate}&nbsp;&nbsp;{data.completedTime}
        </Typography>
      </Box>
    </Box>
  );
}