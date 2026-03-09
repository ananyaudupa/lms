import { Box, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { DashboardSidebar } from '../../dashboard/components/sidebar';
import { RoadmapPage } from '../../roadmap/pages/RoadmapPage';
import { CourseDetailHeader } from '../components/CourseDetailHeader';
import { CourseLevelBar } from '../components/CourseLevelBar';
import { tokens } from '@org/shared';

type Course = {
  title: string;
  description: string;
  image: string;
  progress?: number;
};

type Props = {
  course: Course;
  onBack: () => void;
};

export function CourseDetailPage({ course, onBack }: Props) {
  const progress = course.progress ?? 0;

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', background: tokens.pageBg }}>
      <DashboardSidebar activePage="Courses" />

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Box sx={{ p: 3 }}>

          {/* Header Card — separate component */}
          <CourseDetailHeader
            title={`${course.title} Developer`}
            description="Build modern, responsive, and interactive user interfaces using cutting-edge frontend technologies like HTML, CSS, JavaScript, and popular frameworks—creating fast, accessible, and visually engaging web experiences across all devices."
            image={course.image}
            progress={progress}
            createdDate="03/02/2026"
            duration="1 Month"
            onBack={onBack}
          />

          {/* Level Bar — separate component */}
          <CourseLevelBar progress={progress} />

          {/* Course Contents */}
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              background: tokens.btnPrimary, borderRadius: 2, p: 1.2,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <MenuBookIcon sx={{ color: '#fff', fontSize: 26 }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={800} sx={{ color: tokens.primary }}>
                Course Contents
              </Typography>
              <Typography fontSize={13} color={tokens.textMuted}>61 lessons • 4 weeks total length</Typography>
            </Box>
          </Box>

          {/* Roadmap */}
          <Box sx={{ background: tokens.cardBg, borderRadius: 3, overflow: 'hidden', boxShadow: tokens.courseCardShadow, height: 600 }}>
            <RoadmapPage isEditable={false} />
          </Box>

        </Box>
      </Box>
    </Box>
  );
}