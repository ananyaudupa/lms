import { useState } from 'react';
import { Box, Typography, Button, LinearProgress } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import BarChartIcon from '@mui/icons-material/BarChart';
import { tokens } from '@org/shared';
import { QuizReadyModal } from './QuizReadyModal';
import { PerformanceAnalyticsModal } from './PerformanceAnalyticsModal';

type Props = {
  progress: number;
  onViewExplanation: (level: number) => void;
};

const levels = ['L1', 'L2', 'L3', 'L4', 'L5'];

const getLevelProgress = (overall: number, index: number) => {
  const perLevel = 100 / levels.length;
  const filled = overall / perLevel;
  if (index < Math.floor(filled)) return 100;
  if (index === Math.floor(filled)) return (filled % 1) * 100;
  return 0;
};

export function CourseLevelBar({ progress, onViewExplanation }: Props) {
  const [quizOpen,      setQuizOpen]      = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const currentLevel = Math.floor(progress / (100 / levels.length));

  return (
    <>
      <Box sx={{
        background: tokens.cardBg, borderRadius: 3,
        px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 2 }, mb: 3,
        boxShadow: tokens.courseCardShadow,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: { xs: 1.5, sm: 3 },
      }}>
        {/* Buttons row on mobile */}
        <Box sx={{ display: 'flex', gap: 1.5, flexShrink: 0 }}>
          <Button variant="contained" startIcon={<QuizIcon />} onClick={() => setQuizOpen(true)}
            sx={{
              flex: { xs: 1, sm: 'none' },
              background: tokens.btnPrimary, textTransform: 'none', fontWeight: 700,
              borderRadius: 2, px: { xs: 1.5, sm: 2.5 }, py: 1.2,
              whiteSpace: 'nowrap', fontSize: { xs: 13, sm: 14 },
              '&:hover': { background: tokens.btnPrimaryHover },
            }}>
            Take A Quiz
          </Button>

          {/* Progress button — show beside quiz on mobile too */}
          <Button variant="contained" startIcon={<BarChartIcon />} onClick={() => setAnalyticsOpen(true)}
            sx={{
              display: { xs: 'flex', sm: 'none' },
              flex: 1,
              background: `linear-gradient(90deg, ${tokens.btnContinue}, #65dfff)`,
              textTransform: 'none', fontWeight: 700, color: '#10148f',
              borderRadius: 2, px: 1.5, py: 1.2,
              whiteSpace: 'nowrap', fontSize: 13,
              '&:hover': { background: `linear-gradient(90deg, ${tokens.btnContinueHover}, #0ea5e9)` },
            }}>
            Progress
          </Button>
        </Box>

        {/* Level progress bars */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, minWidth: 0 }}>
          {levels.map((level, i) => (
            <Box key={level} sx={{ flex: 1, textAlign: 'center', minWidth: 0 }}>
              <Typography fontSize={12} fontWeight={600} color={tokens.textMuted} sx={{ mb: 0.5 }}>{level}</Typography>
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

        {/* Progress button — desktop only */}
        <Button variant="contained" startIcon={<BarChartIcon />} onClick={() => setAnalyticsOpen(true)}
          sx={{
            display: { xs: 'none', sm: 'flex' },
            background: `linear-gradient(90deg, ${tokens.btnContinue}, #65dfff)`,
            textTransform: 'none', fontWeight: 700, color: '#10148f',
            borderRadius: 2, px: 2.5, py: 1.2,
            whiteSpace: 'nowrap', flexShrink: 0,
            '&:hover': { background: `linear-gradient(90deg, ${tokens.btnContinueHover}, #0ea5e9)` },
          }}>
          Progress
        </Button>
      </Box>

      <QuizReadyModal open={quizOpen} onClose={() => setQuizOpen(false)} onStart={() => setQuizOpen(false)} level={currentLevel} attempt={1} />
      <PerformanceAnalyticsModal open={analyticsOpen} onClose={() => setAnalyticsOpen(false)} onViewExplanation={onViewExplanation} />
    </>
  );
}