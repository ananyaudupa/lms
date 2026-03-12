import { Box, Typography } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SchoolIcon from '@mui/icons-material/School';
import { certifications } from '../data/certifications.data';

const BRAND = '#10148f';

export function CertificationsTab() {
  return (
    <Box>
      <Typography fontWeight={900} fontSize={26} color={BRAND} mb={3}>
        My Certifications
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
        {certifications.map((cert) => (
          <Box
            key={cert.id}
            sx={{
              background: '#fff', borderRadius: 3,
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              p: 2.5, display: 'flex', flexDirection: 'column', gap: 2,
            }}
          >
            {/* Icon + title */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box sx={{
                width: 56, height: 56, borderRadius: 2, flexShrink: 0,
                background: BRAND,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <SchoolIcon sx={{ color: '#fff', fontSize: 30 }} />
              </Box>
              <Typography fontWeight={800} fontSize={16} color="#0f172a" lineHeight={1.4}>
                {cert.title}
              </Typography>
            </Box>

            {/* Issued date */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarTodayIcon sx={{ fontSize: 15, color: '#94a3b8' }} />
              <Typography fontSize={13} color="#64748b">
                Issued: {cert.issuedDate}
              </Typography>
            </Box>

            {/* Action buttons */}
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Box
                sx={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: 1, py: 1, borderRadius: 2, cursor: 'pointer',
                  background: BRAND, color: '#fff',
                  fontWeight: 700, fontSize: 13,
                  '&:hover': { opacity: 0.9 },
                }}
              >
                <Typography fontWeight={700} fontSize={13} color="#fff">
                  Download Certificate
                </Typography>
                <DownloadIcon sx={{ fontSize: 18, color: '#fff' }} />
              </Box>

              <Box
                sx={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: 0.8, px: 2, py: 1, borderRadius: 2, cursor: 'pointer',
                  background: BRAND, color: '#fff',
                  '&:hover': { opacity: 0.9 },
                }}
              >
                <Typography fontWeight={700} fontSize={13} color="#fff">View</Typography>
                <VisibilityIcon sx={{ fontSize: 18, color: '#fff' }} />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}