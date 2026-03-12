import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { DashboardSidebar } from '../components/sidebar';
import { DashboardStatsCards } from '../components/Dashboardstatscards';
import { DashboardContinueLearning } from '../components/continuelearning';
import { DashboardRightPanel } from '../components/rightpanel';
import { tokens } from '@org/shared';

export function DashboardPage() {
  return (
   <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', background: tokens.pageBg }}>
      <DashboardSidebar activePage="Dashboard" />

      <Box sx={{ flex: 1, p: { xs: 2, sm: 3, md: 4 }, overflowY: 'auto', minWidth: 0 }}>
        {/* Header */}
        <Box sx={{ mb: { xs: 2.5, md: 4 } }}>
          <Typography
            fontWeight={800}
            sx={{ color: tokens.primary, mb: 0.5, fontSize: { xs: '1.4rem', sm: '1.7rem', md: '2rem' } }}
          >
            Welcome, Adam!
          </Typography>
          <Typography sx={{ color: tokens.textMuted, fontSize: { xs: 13, md: 15 } }}>
            Continue your learning journey and achieve your skills
          </Typography>
        </Box>

        {/* Stats cards */}
        <Box sx={{ mb: { xs: 2.5, md: 4 } }}>
          <DashboardStatsCards />
        </Box>

        {/* Main content grid */}
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <DashboardContinueLearning />
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <DashboardRightPanel />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}