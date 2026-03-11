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

      {/* Right side — fully scrollable */}
      <div style={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>
        <div style={{ padding: '24px 24px 0 24px' }}>

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
              <MenuBookIcon sx={{ color: '#fff', fontSize: 26 }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={800} sx={{ color: tokens.primary }}>Course Contents</Typography>
              <Typography fontSize={13} color={tokens.textMuted}>61 lessons • 4 weeks total length</Typography>
            </Box>
          </Box>

        </div>

        {/* Roadmap — fixed tall height, user scrolls page to see more */}
        <div style={{ margin: '0 24px 24px 24px', borderRadius: 12, overflow: 'hidden', height: 2200, background: '#f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <RoadmapPage isEditable={false} />
        </div>

      </div>
    </div>
  );
}