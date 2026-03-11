import { Box, Typography, LinearProgress } from '@mui/material';
import type { AttemptResult } from '../data/assessmentResult.data';

type Props = {
  attempt: AttemptResult;
  isActive: boolean;
};

export function AttemptScoreCard({ attempt, isActive }: Props) {
  const hasData = attempt.date !== null;
  const textColor = isActive ? '#0f172a' : '#cbd5e1';
  const labelColor = isActive ? '#64748b' : '#cbd5e1';
  const scoreColor = isActive ? '#2563eb' : '#e2e8f0';

  return (
    <Box sx={{
      flex: 1,
      borderRadius: 3,
      border: isActive ? '2px solid #38bdf8' : '1.5px solid #e2e8f0',
      background: isActive ? '#fff' : '#fafafa',
      p: 2.5,
      transition: 'all 0.2s',
    }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography fontWeight={700} fontSize={15} color={textColor}>
          Attempt {attempt.attemptNumber}
        </Typography>
        <Box sx={{
          border: `1.5px solid ${isActive ? '#94a3b8' : '#e2e8f0'}`,
          borderRadius: 5, px: 1.2, py: 0.3,
          fontSize: 11, fontWeight: 600,
          color: isActive ? '#64748b' : '#cbd5e1',
        }}>
          {attempt.questionsCount} Questions
        </Box>
      </Box>

      {/* Score */}
      <Typography fontWeight={900} fontSize={36} color={scoreColor} mb={1} lineHeight={1}>
        {hasData ? `${attempt.totalScore}%` : '0%'}
      </Typography>

      {/* Progress bar */}
      <LinearProgress
        variant="determinate"
        value={hasData ? attempt.totalScore : 0}
        sx={{
          height: 6, borderRadius: 3, mb: 2,
          background: '#e2e8f0',
          '& .MuiLinearProgress-bar': {
            background: isActive
              ? 'linear-gradient(90deg, #2563eb, #38bdf8)'
              : '#e2e8f0',
            borderRadius: 3,
          },
        }}
      />

      {/* Breakdown */}
      {[
        { label: 'Correctness', value: attempt.correctness },
        { label: 'Efficiency',  value: attempt.efficiency },
        { label: 'Code Quality',value: attempt.codeQuality },
      ].map((row) => (
        <Box key={row.label} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography fontSize={13} color={labelColor}>{row.label}</Typography>
          <Typography fontSize={13} fontWeight={700} color={labelColor}>
            {hasData ? `${row.value}%` : '0%'}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}