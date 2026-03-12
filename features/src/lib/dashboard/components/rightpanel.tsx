import { Box, Typography, LinearProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { tokens } from '@org/shared';

const activities = [
  {
    icon: <CheckCircleIcon sx={{ color: '#16a34a', fontSize: 22 }} />,
    bg: '#dcfce7',
    title: 'Completed Web Development Fundamentals',
    time: '2 hours ago',
  },
  {
    icon: <CheckCircleIcon sx={{ color: tokens.primary, fontSize: 22 }} />,
    bg: '#dbeafe',
    title: 'Submitted Assignment 1',
    time: '3 days ago',
  },
  {
    icon: <MenuBookIcon sx={{ color: tokens.statCard3, fontSize: 22 }} />,
    bg: '#ede9fe',
    title: 'Enrolled - Git & Version Control',
    time: '1 day ago',
  },
];

export function DashboardRightPanel() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Weekly Goal */}
      <Box sx={{
        background: `linear-gradient(135deg, ${tokens.weeklyGoalFrom} 0%, ${tokens.weeklyGoalTo} 100%)`,
        borderRadius: 3, p: { xs: 2.5, sm: 3 }, color: '#fff',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <TrackChangesIcon />
          <Typography fontWeight={700} fontSize={{ xs: 16, sm: 18 }}>Weekly Goal</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography fontSize={{ xs: 13, sm: 14 }} sx={{ opacity: 0.85 }}>Learning Hours</Typography>
          <Typography fontSize={{ xs: 13, sm: 14 }} fontWeight={700}>12 / 15h</Typography>
        </Box>
        <LinearProgress variant="determinate" value={80} sx={{
          height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.2)', mb: 1.5,
          '& .MuiLinearProgress-bar': { background: '#fff', borderRadius: 4 },
        }} />
        <Typography fontSize={13} sx={{ opacity: 0.8, fontStyle: 'italic' }}>
          Keep Going! You're Almost There!
        </Typography>
      </Box>

      {/* Recent Activities */}
      <Box sx={{
        background: '#fff', borderRadius: 3,
        p: { xs: 2.5, sm: 3 },
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}>
        <Typography fontWeight={700} fontSize={{ xs: 16, sm: 18 }} sx={{ mb: 2.5, color: tokens.textPrimary }}>
          Recent Activities
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {activities.map((activity, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
              <Box sx={{
                background: activity.bg, borderRadius: 2, p: 0.8, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {activity.icon}
              </Box>
              <Box>
                <Typography fontSize={{ xs: 12, sm: 13 }} fontWeight={600}
                  sx={{ color: tokens.textPrimary, lineHeight: 1.4 }}>
                  {activity.title}
                </Typography>
                <Typography fontSize={12} sx={{ color: '#94a3b8', mt: 0.3 }}>{activity.time}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}