import { Box, Typography } from '@mui/material';
import { tokens } from '@org/shared';
import { DashboardSidebar } from '../../dashboard/components/sidebar';
import { LevelHeaderCard } from '../components/level-explanation/LevelHeaderCard';
import { AttemptsLog } from '../components/level-explanation/AttemptsLog';
import { getLevelExplanation } from '../data/explanation.data';

type Props = { level: number; onBack: () => void };

export function LevelExplanationPage({ level, onBack }: Props) {
  const data = getLevelExplanation(level);

  if (!data) {
    return (
      <Box sx={{ display: 'flex', height: '100vh', background: tokens.pageBg }}>
        <DashboardSidebar activePage="Courses" />
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography color={tokens.textMuted}>No explanation data found for Level {level}.</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', background: tokens.pageBg }}>
      <DashboardSidebar activePage="Courses" />
      <Box sx={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <LevelHeaderCard data={data} onBack={onBack} />
          <AttemptsLog attempts={data.attempts} />
        </Box>
      </Box>
    </Box>
  );
}