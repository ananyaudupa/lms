import { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArticleIcon from '@mui/icons-material/Article';
import type { AttemptResult } from '../data/assessmentResult.data';
import { tokens } from '@org/shared';

type Props = {
  attempt: AttemptResult;
  defaultExpanded?: boolean;
};

export function AttemptAnalysisRow({ attempt, defaultExpanded = false }: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const hasData = attempt.date !== null;

  const scoreColor = (score: number, max: number) => {
    const pct = (score / max) * 100;
    if (pct >= 70) return '#16a34a';
    if (pct >= 40) return '#d97706';
    return '#dc2626';
  };

  const circleBg = (score: number, max: number) => {
    const pct = (score / max) * 100;
    if (pct >= 70) return { border: '#22c55e', bg: '#f0fdf4', text: '#16a34a' };
    if (pct >= 40) return { border: '#fbbf24', bg: '#fffbeb', text: '#d97706' };
    return { border: '#ef4444', bg: '#fff5f5', text: '#dc2626' };
  };

  return (
    <Box sx={{
      background: '#fff',
      borderRadius: 3,
      mb: 2,
      boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
      overflow: 'hidden',
    }}>
      {/* Row header */}
      <Box
        onClick={() => hasData && setExpanded(!expanded)}
        sx={{
          display: 'flex', alignItems: 'center',
          px: { xs: 1.5, sm: 2.5 },
          py: { xs: 1.5, sm: 2 },
          cursor: hasData ? 'pointer' : 'default',
          '&:hover': hasData ? { background: '#f8fafc' } : {},
          gap: { xs: 1, sm: 0 },
        }}
      >
        {/* Icon */}
        <Box sx={{
          width: { xs: 36, sm: 44 }, height: { xs: 36, sm: 44 },
          borderRadius: 2, mr: { xs: 1.5, sm: 2 }, flexShrink: 0,
          background: hasData ? tokens.btnPrimary : '#e2e8f0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ArticleIcon sx={{ color: '#fff', fontSize: { xs: 18, sm: 22 } }} />
        </Box>

        {/* Title + date */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            fontWeight={800}
            color={hasData ? '#0f172a' : '#cbd5e1'}
            sx={{ fontSize: { xs: 14, sm: 16 } }}
          >
            Attempt {attempt.attemptNumber} Analysis
          </Typography>
          <Typography
            color={hasData ? '#64748b' : '#cbd5e1'}
            sx={{ fontSize: { xs: 11, sm: 13 } }}
          >
            {hasData ? `${attempt.date}  ${attempt.time}` : '----  ----'}
          </Typography>
        </Box>

        {/* Score — hide label on very small screens */}
        <Box sx={{ textAlign: 'right', mr: { xs: 1, sm: 2 } }}>
          <Typography
            color={hasData ? '#64748b' : '#cbd5e1'}
            fontWeight={500}
            sx={{ fontSize: { xs: 11, sm: 12 }, display: { xs: 'none', sm: 'block' } }}
          >
            Total Score
          </Typography>
          <Typography
            fontWeight={900}
            color={hasData ? '#0f172a' : '#cbd5e1'}
            sx={{ fontSize: { xs: 15, sm: 20 } }}
          >
            {hasData ? `${attempt.totalScore}` : '---'} / 100
          </Typography>
        </Box>

        {hasData
          ? (expanded ? <ExpandLessIcon sx={{ color: '#64748b' }} /> : <ExpandMoreIcon sx={{ color: '#64748b' }} />)
          : <ExpandMoreIcon sx={{ color: '#e2e8f0' }} />
        }
      </Box>

      {/* Expanded question list */}
      {expanded && hasData && (
        <Box sx={{ borderTop: '1px solid #f1f5f9' }}>
          {attempt.questions.map((q, idx) => {
            const colors = circleBg(q.score, q.maxScore);
            const isLow = (q.score / q.maxScore) * 100 < 40;
            return (
              <Box key={q.id}>
                <Box sx={{
                  display: 'flex', alignItems: 'center',
                  px: { xs: 1.5, sm: 2.5 },
                  py: { xs: 1.2, sm: 1.8 },
                  borderLeft: `4px solid ${isLow ? '#ef4444' : 'transparent'}`,
                  '&:hover': { background: '#f8fafc' },
                  cursor: 'pointer',
                  gap: { xs: 1, sm: 0 },
                }}>
                  {/* Number circle */}
                  <Box sx={{
                    width: { xs: 30, sm: 36 }, height: { xs: 30, sm: 36 },
                    borderRadius: '50%', mr: { xs: 1.5, sm: 2 }, flexShrink: 0,
                    border: `2px solid ${colors.border}`,
                    background: colors.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Typography fontSize={11} fontWeight={800} color={colors.text}>
                      {String(q.id).padStart(2, '0')}
                    </Typography>
                  </Box>

                  {/* Question label */}
                  <Typography
                    fontWeight={600}
                    color="#0f172a"
                    sx={{ flex: 1, fontSize: { xs: 13, sm: 15 } }}
                  >
                    {q.label}
                  </Typography>

                  {/* Score badge */}
                  <Box sx={{
                    background: isLow ? '#fff5f5' : '#f0fdf4',
                    border: `1px solid ${isLow ? '#fecaca' : '#bbf7d0'}`,
                    borderRadius: 2,
                    px: { xs: 1, sm: 1.5 }, py: 0.4,
                    mr: { xs: 0.5, sm: 1.5 },
                  }}>
                    <Typography fontSize={13} fontWeight={700} color={scoreColor(q.score, q.maxScore)}>
                      {q.score}
                    </Typography>
                  </Box>

                  <ChevronRightIcon sx={{ color: '#94a3b8', fontSize: { xs: 16, sm: 20 } }} />
                </Box>
                {idx < attempt.questions.length - 1 && (
                  <Divider sx={{ borderColor: '#f1f5f9', ml: { xs: '60px', sm: '72px' } }} />
                )}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}