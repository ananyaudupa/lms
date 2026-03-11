import { Box, Typography } from '@mui/material';
import type { Assessment } from '../data/assessment.data';
import { tokens } from '@org/shared';

type Props = {
  assessment: Assessment;
  onClick: () => void;
};

export function AssessmentCard({ assessment, onClick }: Props) {
  const attemptsLeft = assessment.totalAttempts - assessment.attemptsUsed;
  const isExhausted = attemptsLeft === 0;

  return (
    <Box sx={{
      background: '#fff',
      borderRadius: 3,
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      },
    }}>
      {/* Image */}
      <Box sx={{ position: 'relative', height: 180, overflow: 'hidden' }}>
        <Box
          component="img"
          src={assessment.image}
          alt={assessment.title}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = 'https://placehold.co/400x220/1e3a5f/ffffff?text=' + encodeURIComponent(assessment.title);
          }}
        />
        {/* Attempts badge if exhausted */}
        {isExhausted && (
          <Box sx={{
            position: 'absolute', top: 10, right: 10,
            background: '#ef4444', color: '#fff',
            borderRadius: 5, px: 1.5, py: 0.3,
            fontSize: 11, fontWeight: 700,
          }}>
            Max Attempts
          </Box>
        )}
        {/* Attempts count badge */}
        {assessment.hasAttempted && !isExhausted && (
          <Box sx={{
            position: 'absolute', top: 10, right: 10,
            background: tokens.btnPrimary, color: '#fff',
            borderRadius: 5, px: 1.5, py: 0.3,
            fontSize: 11, fontWeight: 700,
          }}>
            {assessment.attemptsUsed}/{assessment.totalAttempts}
          </Box>
        )}
      </Box>

      {/* Content */}
      <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography fontWeight={800} fontSize={18} color="#0f172a" mb={0.8}>
          {assessment.title}
        </Typography>
        <Typography fontSize={13.5} color="#64748b" lineHeight={1.6} mb={2.5} sx={{ flex: 1 }}>
          {assessment.description}
        </Typography>

        {/* Action button */}
        <Box
          onClick={isExhausted ? undefined : onClick}
          sx={{
            width: '100%',
            py: 1.5,
            borderRadius: 2,
            textAlign: 'center',
            cursor: isExhausted ? 'not-allowed' : 'pointer',
            fontWeight: 700,
            fontSize: 15,
            background: isExhausted
              ? '#e2e8f0'
              : assessment.hasAttempted
              ? 'linear-gradient(90deg, #06b6d4, #38bdf8)'
              : `linear-gradient(90deg, ${tokens.btnPrimary}, #3b5bdb)`,
            color: isExhausted ? '#94a3b8' : '#fff',
            transition: 'opacity 0.2s',
            '&:hover': { opacity: isExhausted ? 1 : 0.9 },
          }}
        >
          {isExhausted
            ? 'No Attempts Left'
            : assessment.hasAttempted
            ? `Attempt  ${assessment.attemptsUsed}/${assessment.totalAttempts}`
            : 'Take Assessment'}
        </Box>
      </Box>
    </Box>
  );
}