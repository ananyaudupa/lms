import { Box, Typography, Modal } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import type { AssessmentDetail } from '../data/assessment.data';

type Props = {
  open: boolean;
  onClose: () => void;
  onStart: () => void;
  data: AssessmentDetail;
};

export function AssessmentLaunchModal({ open, onClose, onStart, data }: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        // Full width on mobile with side margins, fixed on larger screens
        width: { xs: 'calc(100% - 32px)', sm: 500, md: 560 },
        maxHeight: { xs: '90vh', sm: 'unset' },
        overflowY: { xs: 'auto', sm: 'visible' },
        background: '#fff',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
        outline: 'none',
      }}>
        {/* Header */}
        <Box sx={{
          p: { xs: '20px 20px 16px', sm: '28px 28px 20px' },
          background: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Dot pattern */}
          <Box sx={{
            position: 'absolute', top: 0, right: 0,
            width: 180, height: 160,
            backgroundImage: 'radial-gradient(circle, #cbd5e1 1.5px, transparent 1.5px)',
            backgroundSize: '14px 14px',
            opacity: 0.5,
            borderRadius: '0 16px 0 0',
          }} />
          <Typography
            fontWeight={900}
            color="#1e3a8a"
            mb={0.5}
            sx={{ fontSize: { xs: 22, sm: 28 } }}
          >
            Master Assessment
          </Typography>
          <Typography fontSize={14} color="#94a3b8">
            You're about to test your knowledge
          </Typography>
        </Box>

        {/* Stats + image row */}
        <Box sx={{
          mx: { xs: 2, sm: 3 }, mb: 2,
          borderRadius: 3,
          overflow: 'hidden',
          display: 'flex',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
        }}>
          {/* Stats */}
          <Box sx={{ p: { xs: 2, sm: 2.5 }, flex: 1 }}>
            {[
              { label: 'Questions', value: '20' },
              { label: 'Time',      value: '01 Hr' },
              { label: 'Attempt',   value: `0${data.attemptsUsed + 1}` },
            ].map((stat) => (
              <Box key={stat.label} sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.8 }}>
                <Typography
                  fontWeight={800}
                  color="#0f172a"
                  sx={{ fontSize: { xs: 13, sm: 17 }, minWidth: { xs: 80, sm: 100 } }}
                >
                  {stat.label}
                </Typography>
                <Typography fontWeight={700} fontSize={15} color="#475569">:</Typography>
                <Typography fontWeight={800} color="#0f172a" sx={{ fontSize: { xs: 18, sm: 22 } }}>
                  {stat.value}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Image — hide on very small screens */}
          <Box sx={{
            width: { xs: 100, sm: 160 },
            flexShrink: 0,
            display: { xs: 'none', sm: 'block' },
          }}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=200&fit=crop"
              alt="Assessment"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Box>

        {/* Ready to start */}
        <Box sx={{
          mx: { xs: 2, sm: 3 }, mb: 2.5,
          p: { xs: 1.5, sm: 2 },
          background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
          borderRadius: 2.5,
          border: '1px solid #7dd3fc',
        }}>
          <Typography fontWeight={800} fontSize={14} color="#0369a1" mb={0.5}>
            Ready to Start?
          </Typography>
          <Typography fontSize={13.5} color="#0c4a6e" lineHeight={1.6}>
            You're about to begin the assessment. You have {data.totalAttempts} attempts.
            Once you start, you'll need to finish it to save your progress.
          </Typography>
        </Box>

        {/* Start button */}
        <Box sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2.5, sm: 3 } }}>
          <Box
            onClick={onStart}
            sx={{
              width: '100%', py: { xs: 1.5, sm: 1.8 },
              borderRadius: 3,
              background: 'linear-gradient(90deg, #1e3a8a, #2563eb)',
              color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5,
              cursor: 'pointer', fontWeight: 800,
              fontSize: { xs: 15, sm: 17 },
              boxShadow: '0 4px 16px rgba(37,99,235,0.4)',
              transition: 'opacity 0.2s',
              '&:hover': { opacity: 0.92 },
            }}
          >
            <SchoolIcon />
            Start Assessment
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}