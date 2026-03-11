import { Box, Typography, Chip, Divider } from '@mui/material';
import { AnswerCard } from './AnswerCard';
import type { QuestionResult } from '../../data/explanation.data';

type Props = {
  q: QuestionResult;
};

export function QuestionBlock({ q }: Props) {
  return (
    <Box sx={{ mb: 3 }}>
      {/* Question header */}
      <Box sx={{
        display: 'flex', alignItems: 'flex-start',
        justifyContent: 'space-between', gap: 2, mb: 1.5,
      }}>
        <Typography variant="h6" fontWeight={800} color="#0f172a">
          Question {q.id}
        </Typography>
        <Chip
          label={q.category}
          size="small"
          sx={{
            background: '#f1f5f9', color: '#475569',
            fontSize: 11, fontWeight: 500, borderRadius: 2,
            flexShrink: 0, maxWidth: 320, height: 'auto',
            '& .MuiChip-label': { whiteSpace: 'normal', py: 0.5 },
          }}
        />
      </Box>

      {/* Question text */}
      <Typography fontSize={15} color="#1e293b" sx={{ mb: 2, lineHeight: 1.7 }}>
        {q.question}
      </Typography>

      {/* Answer options */}
      {q.options.map((opt: import('../../data/explanation.data').AnswerOption) => (
        <AnswerCard key={opt.letter} option={opt} />
      ))}

      {/* Separator between questions */}
      <Divider sx={{ mt: 3, borderColor: '#e2e8f0' }} />
    </Box>
  );
}