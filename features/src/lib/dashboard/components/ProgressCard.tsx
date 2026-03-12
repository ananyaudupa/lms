import { Box, Typography, LinearProgress } from '@mui/material';
import { CourseActionButton } from './CourseActionButton';
import { tokens } from '@org/shared';
import { courseStore } from '../../courses/context/CourseContext';

type Props = {
  title: string;
  progress: number;
  status: 'finished' | 'continue' | 'start';
  image: string;
  description?: string;
};

const progressColor = (progress: number) =>
  progress === 100 ? '#16a34a' : progress === 0 ? tokens.textMuted : tokens.primary;

export function CourseProgressCard({ title, progress, status, image, description = '' }: Props) {
  const handleClick = () => {
    courseStore.set({ title, image, progress, description, enrolled: true });
    window.location.href = '/course-detail';
  };

  return (
    <Box sx={{
      background: '#fff', borderRadius: 3, p: { xs: 2, sm: 2.5 },
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: { xs: 'flex-start', sm: 'center' },
      gap: { xs: 1.5, sm: 2.5 },
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      transition: 'box-shadow 0.2s',
      '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
    }}>
      {/* Image */}
      <Box component="img" src={image} alt={title} sx={{
        width: { xs: '100%', sm: 100 },
        height: { xs: 160, sm: 75 },
        borderRadius: 2,
        objectFit: 'cover',
        flexShrink: 0,
      }} />

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
        <Typography fontWeight={700} fontSize={{ xs: 15, sm: 17 }} sx={{ mb: 1.5, color: tokens.textPrimary }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <Typography fontSize={13} color={tokens.textMuted}>Progress</Typography>
          <Typography fontSize={13} fontWeight={700} sx={{ color: progressColor(progress), ml: 'auto' }}>
            {progress}% Completed
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={progress} sx={{
          height: 6, borderRadius: 3, background: '#e2e8f0',
          '& .MuiLinearProgress-bar': {
            background: progress === 100
              ? `linear-gradient(90deg, ${tokens.sidebarBgFrom}, ${tokens.primary})`
              : `linear-gradient(90deg, ${tokens.primary}, ${tokens.secondary})`,
            borderRadius: 3,
          },
        }} />
      </Box>

      {/* Button */}
      <Box
        sx={{ flexShrink: 0, width: { xs: '100%', sm: 'auto' }, cursor: 'pointer' }}
        onClick={handleClick}
      >
        <CourseActionButton status={status} />
      </Box>
    </Box>
  );
}