import { Box, Typography, Button, Modal } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import { tokens } from '@org/shared';

type Props = {
  open: boolean;
  onClose: () => void;
  onStart: () => void;
  level?: number;
  attempt?: number;
};

export function QuizReadyModal({ open, onClose, onStart, level = 1, attempt = 1 }: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 560 },
        background: '#fff',
        borderRadius: 4,
        boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
        p: 3,
        outline: 'none',
        // Dotted background pattern
        backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)',
        backgroundSize: '18px 18px',
        backgroundPosition: 'top right',
      }}>

        {/* Title */}
        <Typography variant="h4" fontWeight={800} sx={{ color: tokens.btnPrimary, mb: 0.3 }}>
          Get Ready for Quiz
        </Typography>
        <Typography sx={{ color: tokens.textMuted, fontSize: 14, mb: 3 }}>
          You're about to test your knowledge
        </Typography>

        {/* Progress + Attempt banner */}
        <Box sx={{
          borderRadius: 3, overflow: 'hidden', mb: 2,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0e7490 100%)',
          p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          minHeight: 90, position: 'relative',
        }}>
          {/* Left: Progress + Attempt */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography fontWeight={700} fontSize={20} sx={{ color: '#ffffff', minWidth: 100 }}>Progress:</Typography>
              <Typography fontWeight={800} fontSize={18} sx={{ color: '#ffffff' }}>Level {level}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography fontWeight={700} fontSize={20} sx={{ color: '#ffffff', minWidth: 100 }}>Attempt:</Typography>
              <Typography fontWeight={800} fontSize={18} sx={{ color: '#ffffff' }}>
                {String(attempt).padStart(2, '0')}
              </Typography>
            </Box>
          </Box>

          {/* Right: Large decorative question marks */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0, zIndex: 1, mr: 1 }}>
            <Typography sx={{ fontSize: 90, color: '#06b6d4', opacity: 0.9, lineHeight: 1, userSelect: 'none', fontWeight: 900 }}>?</Typography>
            <Typography sx={{ fontSize: 70, color: '#06b6d4', opacity: 0.6, lineHeight: 1, userSelect: 'none', fontWeight: 900, mt: 2 }}>?</Typography>
            <Typography sx={{ fontSize: 50, color: '#06b6d4', opacity: 0.4, lineHeight: 1, userSelect: 'none', fontWeight: 900, mt: 4 }}>?</Typography>
          </Box>
        </Box>

        {/* Info box */}
        <Box sx={{
          background: '#eff6ff', borderRadius: 2, p: 2, mb: 2,
          border: `1px solid #bfdbfe`,
        }}>
          <Typography fontWeight={700} fontSize={14} sx={{ color: tokens.textPrimary, mb: 0.5 }}>
            Ready to Start?
          </Typography>
          <Typography fontSize={13.5} sx={{ color: tokens.textMuted, lineHeight: 1.7 }}>
            You're about to begin Level {level + 1} Quiz. You have 3 attempts. Once
            you start, you'll need to finish it to save your score.
          </Typography>
        </Box>

        {/* Start button — centered */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<QuizIcon />}
            onClick={onStart}
            sx={{
              px: 5, py: 1.5, borderRadius: 2, fontWeight: 700, fontSize: 16,
              textTransform: 'none',
              background: tokens.btnPrimary,
              '&:hover': { background: tokens.btnPrimaryHover },
            }}
          >
            Start Quiz
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}