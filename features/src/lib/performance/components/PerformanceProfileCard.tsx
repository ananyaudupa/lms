import { Box, Typography, Chip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import GradeIcon from '@mui/icons-material/Grade';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { performanceProfile } from '../data/performance.data';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
const BRAND = '#10148f';

const statIcons: Record<string, React.ReactNode> = {
  roleBasedCourse:  <MenuBookIcon sx={{ fontSize: 28, color: BRAND }} />,
  upskillingCourse: <MenuBookIcon sx={{ fontSize: 28, color: BRAND }} />,
  masterAssessment: <AssessmentIcon sx={{ fontSize: 28, color: BRAND }} />,
  certifications:   <CardMembershipIcon sx={{ fontSize: 28, color: BRAND }} />,
  averageGrade:     <GradeIcon sx={{ fontSize: 28, color: BRAND }} />,
  attendance:       <TrendingUpIcon sx={{ fontSize: 28, color: BRAND }} />,
};

export function PerformanceProfileCard() {
  const p = performanceProfile;

  return (
    <Box sx={{
      background: '#fff', borderRadius: 3, p: 3, mb: 3,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      display: 'flex', alignItems: 'center', gap: 3,
    }}>
      {/* Avatar + info */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5, flex: 1 }}>
        <Box sx={{
          width: 72, height: 72, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid #93c5fd',
        }}>
          <PersonIcon sx={{ fontSize: 38, color: BRAND }} />
        </Box>

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography fontWeight={900} fontSize={26} color={BRAND}>
              {p.name}
            </Typography>
            <ManageAccountsIcon sx={{ fontSize: 24, color: BRAND }} />
          </Box>
          <Typography fontSize={14} color="#64748b" mb={1.5}>{p.role}</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
            <Chip label={p.batchCode} size="small" sx={{ border: '1.5px solid #cbd5e1', background: '#fff', fontWeight: 700, fontSize: 12, color: BRAND }} />
            <Chip label={p.batch}    size="small" sx={{ border: '1.5px solid #cbd5e1', background: '#fff', fontWeight: 700, fontSize: 12, color: BRAND }} />
            <Chip
              icon={<AutoAwesomeIcon sx={{ fontSize: 14, color: `${BRAND} !important` }} />}
              label={`LEVEL ${p.level}  Learner`}
              size="small"
              sx={{ border: `1.5px solid ${BRAND}`, background: '#eef2ff', fontWeight: 700, fontSize: 12, color: BRAND }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailIcon sx={{ fontSize: 16, color: BRAND }} />
            <Typography fontSize={13} color={BRAND} sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
              {p.email}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Divider */}
      <Box sx={{ width: '1.5px', height: 120, background: '#e2e8f0', flexShrink: 0 }} />

      {/* Stats grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5, flex: 1.2 }}>
        {p.stats.map((stat, idx) => (
          <Box key={idx} sx={{
            display: 'flex', alignItems: 'center', gap: 1.5,
            border: '1.5px solid #e2e8f0', borderRadius: 2, p: 1.5,
            background: '#fafafa',
          }}>
            {statIcons[stat.icon]}
            <Box>
              <Typography fontWeight={900} fontSize={20} color={BRAND} lineHeight={1}>
                {stat.value}
              </Typography>
              <Typography fontSize={11} color="#64748b" lineHeight={1.3} sx={{ whiteSpace: 'pre-line' }}>
                {stat.label}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}