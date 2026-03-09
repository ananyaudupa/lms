import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { DashboardSidebar } from '../components/sidebar';
import { DashboardStatsCards } from '../components/Dashboardstatscards';
import { DashboardContinueLearning } from '../components/continuelearning';
import { DashboardRightPanel } from '../components/rightpanel';
import { tokens } from '@org/shared';

export function DashboardPage() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: tokens.pageBg }}>
      <DashboardSidebar activePage="Dashboard" />
      <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, overflowY: 'auto' }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={800} sx={{ color: tokens.primary, mb: 0.5 }}>
            Welcome, Adam!
          </Typography>
          <Typography sx={{ color: tokens.textMuted, fontSize: 15 }}>
            Continue your learning journey and achieve your skills
          </Typography>
        </Box>
        <Box sx={{ mb: 4 }}><DashboardStatsCards /></Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 8 }}><DashboardContinueLearning /></Grid>
          <Grid size={{ xs: 12, lg: 4 }}><DashboardRightPanel /></Grid>
        </Grid>
      </Box>
    </Box>
  );
}