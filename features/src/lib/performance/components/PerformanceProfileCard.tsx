import { Box, Typography, Chip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import GradeIcon from '@mui/icons-material/Grade';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { performanceProfile } from '../data/performance.data';

const BRAND = '#10148f';

const statIcons: Record<string, React.ReactNode> = {
  roleBasedCourse:  <MenuBookIcon sx={{ fontSize: 24, color: BRAND }} />,
  upskillingCourse: <MenuBookIcon sx={{ fontSize: 24, color: BRAND }} />,
  masterAssessment: <AssessmentIcon sx={{ fontSize: 24, color: BRAND }} />,
  certifications:   <CardMembershipIcon sx={{ fontSize: 24, color: BRAND }} />,
  averageGrade:     <GradeIcon sx={{ fontSize: 24, color: BRAND }} />,
  attendance:       <TrendingUpIcon sx={{ fontSize: 24, color: BRAND }} />,
};

export function PerformanceProfileCard() {
  const p = performanceProfile;

  return (
    <Box sx={{
      background: '#fff', borderRadius: 3,
      p: { xs: 2, sm: 2.5, md: 3 },
      mb: 3,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: { xs: 'stretch', md: 'center' },
      gap: { xs: 2.5, md: 3 },
    }}>
      {/* Avatar + info */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flex: 1 }}>
        <Box sx={{
          width: { xs: 56, sm: 72 }, height: { xs: 56, sm: 72 },
          borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid #93c5fd',
        }}>
          <PersonIcon sx={{ fontSize: { xs: 30, sm: 38 }, color: BRAND }} />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
            <Typography fontWeight={900} color={BRAND}
              sx={{ fontSize: { xs: '1.1rem', sm: '1.4rem', md: '1.6rem' } }}
            >
              {p.name}
            </Typography>
            <ManageAccountsIcon sx={{ fontSize: 22, color: BRAND }} />
          </Box>
          <Typography color="#64748b" mb={1.5}
            sx={{ fontSize: { xs: 12, sm: 14 } }}
          >
            {p.role}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
            <Chip label={p.batchCode} size="small" sx={{ border: '1.5px solid #cbd5e1', background: '#fff', fontWeight: 700, fontSize: 12, color: BRAND }} />
            <Chip label={p.batch}     size="small" sx={{ border: '1.5px solid #cbd5e1', background: '#fff', fontWeight: 700, fontSize: 12, color: BRAND }} />
            <Chip
              icon={<AutoAwesomeIcon sx={{ fontSize: 14, color: `${BRAND} !important` }} />}
              label={`LEVEL ${p.level}  Learner`}
              size="small"
              sx={{ border: `1.5px solid ${BRAND}`, background: '#eef2ff', fontWeight: 700, fontSize: 12, color: BRAND }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailIcon sx={{ fontSize: 15, color: BRAND }} />
            <Typography color={BRAND} sx={{
              fontSize: { xs: 11, sm: 13 },
              textDecoration: 'underline', cursor: 'pointer',
              wordBreak: 'break-all',
            }}>
              {p.email}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Divider — horizontal on mobile, vertical on desktop */}
      <Box sx={{
        width: { xs: '100%', md: '1.5px' },
        height: { xs: '1.5px', md: 120 },
        background: '#e2e8f0', flexShrink: 0,
      }} />

      {/* Stats grid — 3 cols always, but smaller on mobile */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: { xs: 1, sm: 1.5 },
        flex: { md: 1.2 },
      }}>
        {p.stats.map((stat, idx) => (
          <Box key={idx} sx={{
            display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 },
            border: '1.5px solid #e2e8f0', borderRadius: 2,
            p: { xs: 1, sm: 1.5 },
            background: '#fafafa',
          }}>
            {statIcons[stat.icon]}
            <Box>
              <Typography fontWeight={900} color={BRAND} lineHeight={1}
                sx={{ fontSize: { xs: 16, sm: 20 } }}
              >
                {stat.value}
              </Typography>
              <Typography color="#64748b" lineHeight={1.3}
                sx={{ fontSize: { xs: 9, sm: 11 }, whiteSpace: 'pre-line' }}
              >
                {stat.label}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}