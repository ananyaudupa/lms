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
      <Typography fontWeight={900} color={BRAND} mb={3}
        sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' } }}
      >
        My Certifications
      </Typography>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        },
        gap: { xs: 2, sm: 2.5, md: 3 },
      }}>
        {certifications.map((cert) => (
          <Box
            key={cert.id}
            sx={{
              background: '#fff', borderRadius: 3,
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              p: { xs: 2, sm: 2.5 },
              display: 'flex', flexDirection: 'column', gap: 2,
            }}
          >
            {/* Icon + title */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box sx={{
                width: { xs: 44, sm: 56 }, height: { xs: 44, sm: 56 },
                borderRadius: 2, flexShrink: 0,
                background: BRAND,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <SchoolIcon sx={{ color: '#fff', fontSize: { xs: 24, sm: 30 } }} />
              </Box>
              <Typography fontWeight={800} color="#0f172a" lineHeight={1.4}
                sx={{ fontSize: { xs: 14, sm: 15, md: 16 } }}
              >
                {cert.title}
              </Typography>
            </Box>

            {/* Issued date */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarTodayIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
              <Typography color="#64748b" sx={{ fontSize: { xs: 12, sm: 13 } }}>
                Issued: {cert.issuedDate}
              </Typography>
            </Box>

            {/* Action buttons */}
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Box sx={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 0.8, py: { xs: 0.8, sm: 1 }, borderRadius: 2, cursor: 'pointer',
                background: BRAND, color: '#fff',
                '&:hover': { opacity: 0.9 },
              }}>
                <Typography fontWeight={700} color="#fff"
                  sx={{ fontSize: { xs: 11, sm: 13 } }}
                >
                  Download
                </Typography>
                <DownloadIcon sx={{ fontSize: { xs: 15, sm: 18 }, color: '#fff' }} />
              </Box>

              <Box sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 0.8, px: { xs: 1.5, sm: 2 }, py: { xs: 0.8, sm: 1 },
                borderRadius: 2, cursor: 'pointer',
                background: BRAND, color: '#fff',
                '&:hover': { opacity: 0.9 },
              }}>
                <Typography fontWeight={700} color="#fff"
                  sx={{ fontSize: { xs: 11, sm: 13 } }}
                >
                  View
                </Typography>
                <VisibilityIcon sx={{ fontSize: { xs: 15, sm: 18 }, color: '#fff' }} />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}