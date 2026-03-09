import { Box, Typography } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { CourseProgressCard } from './ProgressCard';

const courses = [
  {
    title: 'Data Engineer',
    progress: 100,
    status: 'finished' as const,
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=120&h=90&fit=crop',
  },
  {
    title: 'Frontend',
    progress: 44,
    status: 'continue' as const,
    image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=120&h=90&fit=crop',
  },
  {
    title: 'Git & Version Control',
    progress: 0,
    status: 'start' as const,
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=120&h=90&fit=crop',
  },
];

export function DashboardContinueLearning() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
        <Typography variant="h6" fontWeight={700} sx={{ color: '#1a1a2e' }}>
          Continue Learning
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#000' }}>
          <PsychologyIcon fontSize="small" />
          <Typography fontSize={16}>Keep the Momentum</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {courses.map((course) => (
          <CourseProgressCard key={course.title} {...course} />
        ))}
      </Box>
    </Box>
  );
}