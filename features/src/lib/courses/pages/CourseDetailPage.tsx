import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { DashboardSidebar } from '../../dashboard/components/sidebar';
import { RoadmapPage } from '../../roadmap/pages/RoadmapPage';
import { CourseDetailHeader } from '../components/CourseDetailHeader';
import { CourseLevelBar } from '../components/CourseLevelBar';
import { LevelExplanationPage } from '../pages/LevelExplanationPage';
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
  const [explanationLevel, setExplanationLevel] = useState<number | null>(null);

  if (explanationLevel !== null) {
    return (
      <LevelExplanationPage
        level={explanationLevel}
        onBack={() => setExplanationLevel(null)}
      />
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: tokens.pageBg }}>
      <DashboardSidebar activePage="Courses" />

      <div style={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>
        <Box sx={{ p: { xs: '16px 16px 0', sm: '20px 20px 0', md: '24px 24px 0' } }}>

          <CourseDetailHeader
            title={`${course.title} Developer`}
            description="Build modern, responsive, and interactive user interfaces using cutting-edge frontend technologies like HTML, CSS, JavaScript, and popular frameworks—creating fast, accessible, and visually engaging web experiences across all devices."
            image={course.image}
            progress={progress}
            createdDate="03/02/2026"
            duration="1 Month"
            onBack={onBack}
          />

          <CourseLevelBar
            progress={progress}
            onViewExplanation={(level) => setExplanationLevel(level)}
          />

          <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              background: tokens.btnPrimary, borderRadius: 2, p: 1.2,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <MenuBookIcon sx={{ color: '#fff', fontSize: { xs: 20, sm: 26 } }} />
            </Box>
            <Box>
              <Typography fontWeight={800} sx={{ color: tokens.primary, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Course Contents
              </Typography>
              <Typography fontSize={13} color={tokens.textMuted}>61 lessons • 4 weeks total length</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{
          mx: { xs: '16px', sm: '20px', md: '24px' },
          mb: '24px',
          borderRadius: 3,
          overflow: 'hidden',
          background: '#f1f5f9',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          position: 'relative',                          // anchors absolute child
          height: { xs: '70vh', sm: '75vh', md: '78vh' }, // real pixel height for ResizeObserver
        }}>
          <RoadmapPage isEditable={false} />
        </Box>
      </div>
    </div>
  );
}