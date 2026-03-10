import { Box, Typography } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { CourseProgressCard } from './ProgressCard';
import { findCourse } from '@org/shared';
// Dashboard picks these 3 courses — data comes from the shared courses.data.ts
const dashboardCourses = [
  { title: 'Data Engineer', status: 'finished' as const },
  { title: 'Frontend',      status: 'continue' as const },
  { title: 'Git & Version Control', status: 'start' as const,
    // fallback for courses not in the main list
    fallback: {
      description: 'Master version control with Git — branching, merging, pull requests, and collaborative workflows.',
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=120&h=90&fit=crop',
      progress: 0,
    }
  },
];

export function DashboardContinueLearning() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
        <Typography variant="h6" fontWeight={700} sx={{ color: '#1a1a2e' }}>Continue Learning</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#000' }}>
          <PsychologyIcon fontSize="small" />
          <Typography fontSize={16}>Keep the Momentum</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {dashboardCourses.map(({ title, status, fallback }) => {
          const course = findCourse(title);
          return (
            <CourseProgressCard
              key={title}
              title={title}
              status={status}
              image={course?.image ?? fallback?.image ?? ''}
              progress={course?.progress ?? fallback?.progress ?? 0}
              description={course?.description ?? fallback?.description ?? ''}
            />
          );
        })}
      </Box>
    </Box>
  );
}