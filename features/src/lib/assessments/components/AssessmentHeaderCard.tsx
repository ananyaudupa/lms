import { Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BarChartIcon from '@mui/icons-material/BarChart';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import type { AssessmentDetail } from '../data/assessment.data';
import { tokens } from '@org/shared';

type Props = {
  data: AssessmentDetail;
  onBack: () => void;
  onLaunch: () => void;
  onResult: () => void;
};

export function AssessmentHeaderCard({ data, onBack, onLaunch, onResult }: Props) {
  return (
    <Box sx={{
      background: '#fff', borderRadius: 3,
      p: { xs: 2, sm: 2.5, md: 3 },
      mb: 3,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    }}>

      {/* Top row: back + title + result button */}
      <Box sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        gap: 1.5,
        mb: 1.5,
        flexWrap: 'wrap',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, minWidth: 0 }}>
          <Box component="button" onClick={onBack} sx={{
            width: 40, height: 40, borderRadius: 2,
            background: '#f1f5f9', border: '1px solid #e2e8f0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
            '&:hover': { background: '#e2e8f0' },
          }}>
            <ArrowBackIcon sx={{ fontSize: 20, color: '#475569' }} />
          </Box>
          <Typography
            fontWeight={900}
            color={tokens.primary}
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.5rem', md: '1.875rem' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: { xs: 'normal', sm: 'nowrap' },
            }}
          >
            {data.title}
          </Typography>
        </Box>

        {/* Result button */}
        <Box onClick={onResult} sx={{
          display: 'flex', alignItems: 'center', gap: 1,
          px: { xs: 1.5, sm: 2 }, py: 1,
          borderRadius: 2, cursor: 'pointer',
          background: '#4edaff',
          color: '#000', fontWeight: 800,
          fontSize: { xs: 13, sm: 15, md: 16 },
          flexShrink: 0,
          '&:hover': { opacity: 0.9 },
        }}>
          <BarChartIcon fontSize="small" />
          Result
        </Box>
      </Box>

      {/* Description */}
      <Typography
        color="#475569"
        lineHeight={1.7}
        mb={2.5}
        sx={{
          fontSize: { xs: 13, sm: 14, md: 14.5 },
          pl: { xs: 0, sm: '56px' },
        }}
      >
        {data.description}
      </Typography>

      {/* Meta + Launch button */}
      <Box sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 },
        pl: { xs: 0, sm: '56px' },
      }}>
        {/* Date + duration */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, sm: 3 }, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <CalendarTodayIcon sx={{ fontSize: 15, color: '#94a3b8' }} />
            <Typography fontSize={13} color="#64748b">Created: {data.createdDate}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <AccessTimeIcon sx={{ fontSize: 15, color: '#94a3b8' }} />
            <Typography fontSize={13} color="#64748b">Duration: {data.duration}</Typography>
          </Box>
        </Box>

        {/* Launch button */}
        <Box onClick={onLaunch} sx={{
          display: 'flex', alignItems: 'center', gap: 1.5,
          px: { xs: 2, sm: 3 }, py: { xs: 1.2, sm: 1.5 },
          borderRadius: 2, cursor: 'pointer',
          background: `linear-gradient(90deg, ${tokens.btnPrimary}, #3b5bdb)`,
          color: '#fff', fontWeight: 700,
          fontSize: { xs: 13, sm: 14, md: 15 },
          boxShadow: '0 4px 14px rgba(37,99,235,0.35)',
          width: { xs: '100%', sm: 'auto' },
          justifyContent: { xs: 'center', sm: 'flex-start' },
          '&:hover': { opacity: 0.92 },
        }}>
          <RocketLaunchIcon fontSize="small" />
          Launch Assessment
        </Box>
      </Box>
    </Box>
  );
}