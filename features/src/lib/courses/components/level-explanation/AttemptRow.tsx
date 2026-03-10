import { useState } from 'react';
import { Box, Typography, Collapse } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { tokens } from '@org/shared';
import { QuestionBlock } from './QuestionBlock';
import type { AttemptLog } from '../../data/explanation.data';

type Props = {
  attempt: AttemptLog;
};

export function AttemptRow({ attempt }: Props) {
  const [open, setOpen] = useState(
    attempt.attemptNumber === 1 && attempt.date !== null
  );
  const hasData = attempt.date !== null;

  return (
    <Box sx={{
      border: '1px solid #e2e8f0',
      borderRadius: 3,
      mb: 1.5,
      overflow: 'hidden',
      background: '#fff',
    }}>
      {/* ── Row header ── */}
      <Box
        onClick={() => hasData && setOpen((v) => !v)}
        sx={{
          display: 'flex', alignItems: 'center', gap: 2,
          px: 3, py: 1.8,
          cursor: hasData ? 'pointer' : 'default',
          '&:hover': hasData ? { background: '#f8fafc' } : {},
        }}
      >
        {/* Attempt number circle */}
        <Box sx={{
          width: 34, height: 34, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: hasData ? tokens.btnPrimary : '#e2e8f0',
          flexShrink: 0,
        }}>
          <Typography fontWeight={700} fontSize={14} color={hasData ? '#fff' : '#94a3b8'}>
            {attempt.attemptNumber}
          </Typography>
        </Box>

        {/* Date */}
        <Typography fontSize={14} fontWeight={600}
          color={hasData ? '#1e293b' : '#94a3b8'} sx={{ minWidth: 100 }}>
          {attempt.date ?? '---'}
        </Typography>

        {/* Time */}
        <Typography fontSize={14} color={hasData ? '#475569' : '#94a3b8'} sx={{ minWidth: 80 }}>
          {attempt.time ?? '---'}
        </Typography>

        <Box sx={{ flex: 1 }} />

        {/* Correct count */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
          <CheckCircleOutlineIcon sx={{ fontSize: 20, color: hasData ? '#22c55e' : '#cbd5e1' }} />
          <Typography fontSize={14} fontWeight={600} color={hasData ? '#1e293b' : '#94a3b8'}>
            {attempt.correct ?? '-'}
          </Typography>
        </Box>

        {/* Incorrect count */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, ml: 2 }}>
          <CancelOutlinedIcon sx={{ fontSize: 20, color: hasData ? '#ef4444' : '#cbd5e1' }} />
          <Typography fontSize={14} fontWeight={600} color={hasData ? '#1e293b' : '#94a3b8'}>
            {attempt.incorrect ?? '-'}
          </Typography>
        </Box>

        {/* Time taken */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, ml: 2 }}>
          <RadioButtonUncheckedIcon sx={{ fontSize: 20, color: hasData ? '#1e293b' : '#cbd5e1' }} />
          <Typography fontSize={14} fontWeight={600} color={hasData ? '#1e293b' : '#94a3b8'}>
            {attempt.timeTaken ?? '-'}
          </Typography>
        </Box>

        {/* Chevron */}
        <Box sx={{ ml: 2 }}>
          {open
            ? <KeyboardArrowUpIcon   sx={{ color: hasData ? '#475569' : '#cbd5e1' }} />
            : <KeyboardArrowDownIcon sx={{ color: hasData ? '#475569' : '#cbd5e1' }} />
          }
        </Box>
      </Box>

      {/* ── Expanded questions ── */}
      <Collapse in={open}>
        {attempt.questions.length > 0 ? (
          <Box sx={{
            px: 3, pt: 2, pb: 3,
            borderTop: '1px solid #f1f5f9',
            background: '#fafbfc',
          }}>
            {attempt.questions.map((q: import('../../data/explanation.data').QuestionResult) => (
              <QuestionBlock key={q.id} q={q} />
            ))}
          </Box>
        ) : (
          <Box sx={{ px: 3, py: 2, borderTop: '1px solid #f1f5f9' }}>
            <Typography fontSize={13} color="#94a3b8">
              No question data available for this attempt.
            </Typography>
          </Box>
        )}
      </Collapse>
    </Box>
  );
}