import { Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { tokens } from '@org/shared';

type Props = {
  title: string;
  description: string;
  image: string;
  progress: number;
  createdDate: string;
  duration: string;
  onBack: () => void;
};

export function CourseDetailHeader({ title, description, image, progress, createdDate, duration, onBack }: Props) {
  return (
    <Box sx={{
      background: tokens.cardBg, borderRadius: 3, p: 3, mb: 3,
      boxShadow: tokens.courseCardShadow,
      display: 'flex', alignItems: 'flex-start', gap: 3,
    }}>
      {/* Image with back button */}
      <Box sx={{ position: 'relative', flexShrink: 0, width: 200, height: 160, borderRadius: 2, overflow: 'hidden' }}>
        <Box component="img" src={image} alt={title}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <Box onClick={onBack} sx={{
          position: 'absolute', top: 8, left: 8,
          background: tokens.cardBg, borderRadius: '50%', width: 34, height: 34,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          '&:hover': { background: '#f1f5f9' },
        }}>
          <ArrowBackIcon sx={{ fontSize: 18, color: tokens.textPrimary }} />
        </Box>
      </Box>

      {/* Title + description */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" fontWeight={800} sx={{ color: tokens.textPrimary, mb: 1 }}>
          {title}
        </Typography>
        <Typography sx={{ color: tokens.textMuted, fontSize: 14, lineHeight: 1.7, mb: 2, textAlign: 'justify' }}>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, border: `1px solid ${tokens.borderColor}`, borderRadius: 2, px: 1.5, py: 0.6 }}>
            <CalendarTodayIcon sx={{ fontSize: 15, color: tokens.textMuted }} />
            <Typography fontSize={13} color={tokens.textMuted}>Created: {createdDate}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, border: `1px solid ${tokens.borderColor}`, borderRadius: 2, px: 1.5, py: 0.6 }}>
            <AccessTimeIcon sx={{ fontSize: 15, color: tokens.textMuted }} />
            <Typography fontSize={13} color={tokens.textMuted}>Duration: {duration}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Circular progress */}
      <Box sx={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ position: 'relative', width: 90, height: 90 }}>
          <svg width="90" height="90" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="45" cy="45" r="38" fill="none" stroke={tokens.borderColor} strokeWidth="7" />
            <circle cx="45" cy="45" r="38" fill="none"
              stroke={tokens.primary} strokeWidth="7"
              strokeDasharray={`${2 * Math.PI * 38}`}
              strokeDashoffset={`${2 * Math.PI * 38 * (1 - progress / 100)}`}
              strokeLinecap="round"
            />
          </svg>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <Typography fontWeight={800} fontSize={18} sx={{ color: tokens.textPrimary, lineHeight: 1 }}>{progress}%</Typography>
          </Box>
        </Box>
        <Typography fontSize={12} color={tokens.textMuted} fontWeight={600} sx={{ mt: 0.5 }}>Overall</Typography>
        <Typography fontSize={12} color={tokens.textMuted} fontWeight={600}>Progress</Typography>
      </Box>
    </Box>
  );
}