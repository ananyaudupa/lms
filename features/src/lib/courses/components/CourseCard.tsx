import { Box, Typography, Button } from '@mui/material';
import { tokens } from '@org/shared';
import { courseStore } from '../context/CourseContext';

type Props = {
  title: string;
  description: string;
  image: string;
  enrolled?: boolean;
  progress?: number;
  buttonLabel?: string;
};

export function CourseCard({ title, description, image, enrolled = false, progress, buttonLabel = 'Begin Course' }: Props) {
  const handleClick = () => {
    courseStore.set({ title, description, image, enrolled, progress });
    window.location.href = '/course-detail';
  };

  return (
    <Box sx={{
      background: tokens.courseCardBg, borderRadius: 3, overflow: 'hidden',
      boxShadow: tokens.courseCardShadow, transition: 'box-shadow 0.2s, transform 0.2s',
      '&:hover': { boxShadow: tokens.courseCardShadowHover, transform: 'translateY(-2px)' },
      position: 'relative',
    }}>
      {/* Image */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <Box component="img" src={image} alt={title}
          sx={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
        {enrolled && (
          <Box sx={{
            position: 'absolute', top: 18, right: -28, width: 120, textAlign: 'center',
            background: `linear-gradient(90deg, ${tokens.enrolledRibbonFrom}, ${tokens.enrolledRibbonTo})`,
            color: tokens.textWhite, fontWeight: 700, fontSize: 13, py: 0.6,
            transform: 'rotate(45deg)', transformOrigin: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}>
            Enrolled
          </Box>
        )}
      </Box>

      {/* Content */}
      <Box sx={{ p: 2.5 }}>
        <Typography fontWeight={800} fontSize={20} sx={{ color: tokens.textPrimary, mb: 1 }}>
          {title}
        </Typography>
        <Typography fontSize={13.5} sx={{ color: tokens.textMuted, mb: 2.5, lineHeight: 1.6, minHeight: 60 }}>
          {description}
        </Typography>

        {enrolled && progress !== undefined ? (
          <Button fullWidth variant="contained" onClick={handleClick}
            sx={{
              background: `linear-gradient(90deg, ${tokens.btnContinue}, #38bdf8)`,
              textTransform: 'none', fontWeight: 700, fontSize: 15, borderRadius: 2, py: 1.2,
              display: 'flex', justifyContent: 'space-between', px: 3,
              '&:hover': { background: `linear-gradient(90deg, ${tokens.btnContinueHover}, #0ea5e9)` },
            }}
          >
            <span>Continue Learning</span>
            <Box sx={{ background: 'rgba(255,255,255,0.25)', borderRadius: 1, px: 1, py: 0.2, fontSize: 13, fontWeight: 800 }}>
              {progress}%
            </Box>
          </Button>
        ) : (
          <Button fullWidth variant="contained" onClick={handleClick}
            sx={{
              background: tokens.btnPrimary,
              textTransform: 'none', fontWeight: 700, fontSize: 15, borderRadius: 2, py: 1.2,
              '&:hover': { background: tokens.btnPrimaryHover },
            }}
          >
            {buttonLabel}
          </Button>
        )}
      </Box>
    </Box>
  );
}