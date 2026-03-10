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
      background: '#fff',
      borderRadius: 3,
      border: `3px solid ${borderColor}`,
      borderTop: `6px solid ${borderColor}`,
      p: 3,
      mb: 3,
      boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
    }}>
      {/* ── Title row ── */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            component="button"
            onClick={onBack}
            sx={{
              width: 38, height: 38, borderRadius: 2,
              background: '#f1f5f9', border: '1px solid #e2e8f0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              '&:hover': { background: '#e2e8f0' },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 18, color: '#475569' }} />
          </Box>
          <Typography variant="h4" fontWeight={900} color={tokens.primary} letterSpacing={1}>
            LEVEL {data.level}
          </Typography>
        </Box>

        <Chip
          label={data.passed ? `Passed ${data.userScore}%` : `Failed ${data.userScore}%`}
          sx={{
            background: 'transparent',
            border: `2px solid ${borderColor}`,
            color: data.passed ? '#16a34a' : '#dc2626',
            fontWeight: 800, fontSize: 14,
            height: 36, px: 1, borderRadius: 5,
          }}
        />
      </Box>

      {/* ── Stats row ── */}
      <Box sx={{ display: 'flex', gap: 6, mb: 2.5 }}>
        <Box>
          <Typography fontSize={12} color="#94a3b8" fontWeight={500} mb={0.3}>
            Passing Score
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
            <Typography fontSize={32} fontWeight={900} color="#0f172a" lineHeight={1}>
              {data.passingScore}
            </Typography>
            <Typography fontSize={16} fontWeight={600} color="#64748b">%</Typography>
          </Box>
        </Box>

        <Box>
          <Typography fontSize={12} color="#94a3b8" fontWeight={500} mb={0.3}>
            Attempt Taken
          </Typography>
          <Typography fontSize={32} fontWeight={900} color="#0f172a" lineHeight={1}>
            {data.attemptsTaken}
          </Typography>
        </Box>

        <Box>
          <Typography fontSize={12} color="#94a3b8" fontWeight={500} mb={0.3}>
            Time Allocated
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.8 }}>
            <Typography fontSize={32} fontWeight={900} color="#0f172a" lineHeight={1}>
              {data.timeAllocated}
            </Typography>
            <Typography fontSize={14} fontWeight={600} color="#94a3b8">min</Typography>
          </Box>
        </Box>
      </Box>

      {/* ── Dates row ── */}
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 2,
        pt: 2, borderTop: '1px solid #f1f5f9',
      }}>
        <CalendarTodayIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
        <Typography fontSize={13} color="#475569">
          <Box component="span" fontWeight={700}>Started: </Box>
          {data.startedDate}&nbsp;&nbsp;{data.startedTime}
        </Typography>
        <Typography color="#d1d5db" mx={1}>|</Typography>
        <Typography fontSize={13} color="#475569">
          <Box component="span" fontWeight={700}>Completed: </Box>
          {data.completedDate}&nbsp;&nbsp;{data.completedTime}
        </Typography>
      </Box>
    </Box>
  );
}