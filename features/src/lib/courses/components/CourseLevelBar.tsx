import { Box, Typography, Button, LinearProgress } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import BarChartIcon from '@mui/icons-material/BarChart';
import { tokens } from '@org/shared';

type Props = {
  progress: number;
};

const levels = ['L1', 'L2', 'L3', 'L4', 'L5'];

const getLevelProgress = (overall: number, index: number) => {
  const perLevel = 100 / levels.length;
  const filled = overall / perLevel;
  if (index < Math.floor(filled)) return 100;
  if (index === Math.floor(filled)) return (filled % 1) * 100;
  return 0;
};

export function CourseLevelBar({ progress }: Props) {
  return (
    <Box sx={{
      background: tokens.cardBg, borderRadius: 3, px: 3, py: 2, mb: 3,
      boxShadow: tokens.courseCardShadow,
      display: 'flex', alignItems: 'center', gap: 3,
    }}>
      <Button variant="contained" startIcon={<QuizIcon />}
        sx={{
          background: tokens.btnPrimary, textTransform: 'none', fontWeight: 700,
          borderRadius: 2, px: 2.5, py: 1.2, whiteSpace: 'nowrap', flexShrink: 0,
          '&:hover': { background: tokens.btnPrimaryHover },
        }}
      >
        Take A Quiz
      </Button>

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
        {levels.map((level, i) => (
          <Box key={level} sx={{ flex: 1, textAlign: 'center' }}>
            <Typography fontSize={12} fontWeight={600} color={tokens.textMuted} sx={{ mb: 0.5 }}>
              {level}
            </Typography>
            <LinearProgress variant="determinate" value={getLevelProgress(progress, i)} sx={{
              height: 6, borderRadius: 3, background: tokens.progressBgColor,
              '& .MuiLinearProgress-bar': {
                background: `linear-gradient(90deg, ${tokens.progressBarFrom}, ${tokens.progressBarTo})`,
                borderRadius: 3,
              },
            }} />
          </Box>
        ))}
      </Box>

      <Button variant="contained" startIcon={<BarChartIcon />}
        sx={{
          background: `linear-gradient(90deg, ${tokens.btnContinue}, #65dfff)`,
          textTransform: 'none', fontWeight: 700, color: '#10148f',
          borderRadius: 2, px: 2.5, py: 1.2, whiteSpace: 'nowrap', flexShrink: 0,
          '&:hover': { background: `linear-gradient(90deg, ${tokens.btnContinueHover}, #0ea5e9)` },
        }}
      >
        Progress
      </Button>
    </Box>
  );
}