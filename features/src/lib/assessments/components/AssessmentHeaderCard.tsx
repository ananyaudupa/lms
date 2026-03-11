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
      background: '#fff', borderRadius: 3, p: 3, mb: 3,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box component="button" onClick={onBack} sx={{
            width: 40, height: 40, borderRadius: 2,
            background: '#f1f5f9', border: '1px solid #e2e8f0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
            '&:hover': { background: '#e2e8f0' },
          }}>
            <ArrowBackIcon sx={{ fontSize: 20, color: '#475569' }} />
          </Box>
          <Typography fontWeight={900} fontSize={30} color={tokens.primary}>
            {data.title}
          </Typography>
        </Box>

        {/* Result button */}
        <Box onClick={onResult} sx={{
          display: 'flex', alignItems: 'center', gap: 1,
          px: 2, py: 1, borderRadius: 2, cursor: 'pointer',
          background: '#4edaff',
          color: '#000', fontWeight: 800, fontSize: 16, flexShrink: 0,
          '&:hover': { opacity: 0.9 },
        }}>
          <BarChartIcon fontSize="small" />
          Result
        </Box>
      </Box>

      <Typography fontSize={14.5} color="#475569" lineHeight={1.7} mb={2.5} sx={{ pl: '56px' }}>
        {data.description}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pl: '56px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <CalendarTodayIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
            <Typography fontSize={13} color="#64748b">Created: {data.createdDate}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <AccessTimeIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
            <Typography fontSize={13} color="#64748b">Duration: {data.duration}</Typography>
          </Box>
        </Box>

        <Box onClick={onLaunch} sx={{
          display: 'flex', alignItems: 'center', gap: 1.5,
          px: 3, py: 1.5, borderRadius: 2, cursor: 'pointer',
          background: `linear-gradient(90deg, ${tokens.btnPrimary}, #3b5bdb)`,
          color: '#fff', fontWeight: 700, fontSize: 15,
          boxShadow: '0 4px 14px rgba(37,99,235,0.35)',
          '&:hover': { opacity: 0.92 },
        }}>
          <RocketLaunchIcon fontSize="small" />
          Launch Assessment
        </Box>
      </Box>
    </Box>
  );
}