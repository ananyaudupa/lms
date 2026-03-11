import { Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DashboardSidebar } from '../../dashboard/components/sidebar';
import { AttemptScoreCard } from '../components/AttemptScoreCard';
import { AttemptAnalysisRow } from '../components/AttemptAnalysisRow';
import { getAssessmentResult } from '../data/assessmentResult.data';
import { tokens } from '@org/shared';

type Props = {
  assessmentId: string;
  onBack: () => void;
};

export function AssessmentResultPage({ assessmentId, onBack }: Props) {
  const result = getAssessmentResult(assessmentId);

  if (!result) {
    return (
      <Box sx={{ display: 'flex', height: '100vh', background: tokens.pageBg }}>
        <DashboardSidebar activePage="Assessments" />
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography color={tokens.textMuted}>No results found.</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', background: tokens.pageBg }}>
      <DashboardSidebar activePage="Assessments" />

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Box sx={{ p: 3 }}>

          {/* Header */}
          <Box sx={{
            background: '#fff', borderRadius: 3, p: 2.5, mb: 3,
            display: 'flex', alignItems: 'center', gap: 2,
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}>
            <Box
              component="button"
              onClick={onBack}
              sx={{
                width: 40, height: 40, borderRadius: 2,
                background: '#f1f5f9', border: '1px solid #e2e8f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', flexShrink: 0,
                '&:hover': { background: '#e2e8f0' },
              }}
            >
              <ArrowBackIcon sx={{ fontSize: 20, color: '#475569' }} />
            </Box>
            <Typography fontWeight={900} fontSize={28} color={tokens.primary}>
              {result.title}
            </Typography>
          </Box>

          {/* 3 attempt score cards */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            {result.attempts.map((attempt, idx) => (
              <AttemptScoreCard
                key={attempt.attemptNumber}
                attempt={attempt}
                isActive={idx === 0}
              />
            ))}
          </Box>

          {/* Attempt analysis rows */}
          {result.attempts.map((attempt, idx) => (
            <AttemptAnalysisRow
              key={attempt.attemptNumber}
              attempt={attempt}
              defaultExpanded={idx === 0 && attempt.date !== null}
            />
          ))}

        </Box>
      </Box>
    </Box>
  );
}