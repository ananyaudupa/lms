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
        width: 560,
        background: '#fff',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
        outline: 'none',
      }}>
        {/* Header with dot pattern background */}
        <Box sx={{
          p: '28px 28px 20px 28px',
          background: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Dot pattern top-right */}
          <Box sx={{
            position: 'absolute', top: 0, right: 0,
            width: 180, height: 160,
            backgroundImage: 'radial-gradient(circle, #cbd5e1 1.5px, transparent 1.5px)',
            backgroundSize: '14px 14px',
            opacity: 0.5,
            borderRadius: '0 16px 0 0',
          }} />

          <Typography fontWeight={900} fontSize={28} color="#1e3a8a" mb={0.5}>
            Mater Assessment
          </Typography>
          <Typography fontSize={14} color="#94a3b8">
            You're about to test your knowledge
          </Typography>
        </Box>

        {/* Stats + image row */}
        <Box sx={{
          mx: 3, mb: 2,
          borderRadius: 3,
          overflow: 'hidden',
          display: 'flex',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
        }}>
          {/* Stats */}
          <Box sx={{ p: 2.5, flex: 1 }}>
            {[
              { label: 'Questions', value: '20' },
              { label: 'Time', value: '01 Hr' },
              { label: 'Attempt', value: `0${data.attemptsUsed + 1}` },
            ].map((stat) => (
              <Box key={stat.label} sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.8 }}>
                <Typography fontWeight={800} fontSize={17} color="#0f172a" sx={{ minWidth: 100 }}>
                  {stat.label}
                </Typography>
                <Typography fontWeight={700} fontSize={15} color="#475569">:</Typography>
                <Typography fontWeight={800} fontSize={22} color="#0f172a">
                  {stat.value}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Image */}
          <Box sx={{ width: 160, flexShrink: 0 }}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=200&fit=crop"
              alt="Assessment"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Box>

        {/* Ready to start info box */}
        <Box sx={{
          mx: 3, mb: 2.5,
          p: 2,
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
        <Box sx={{ px: 3, pb: 3 }}>
          <Box
            onClick={onStart}
            sx={{
              width: '100%', py: 1.8,
              borderRadius: 3,
              background: 'linear-gradient(90deg, #1e3a8a, #2563eb)',
              color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5,
              cursor: 'pointer', fontWeight: 800, fontSize: 17,
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