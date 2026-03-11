import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DashboardSidebar } from '../../dashboard/components/sidebar';
import { AssessmentHeaderCard } from '../components/AssessmentHeaderCard';
import { AssessmentGuidelinesSection } from '../components/AssessmentGuidelinesSection';
import { AssessmentLaunchModal } from '../components/AssessmentLaunchModal';
import { AssessmentResultPage } from './AssessmentResultPage';
import { getAssessmentDetail } from '../data/assessment.data';
import { tokens } from '@org/shared';

type Props = {
  assessmentId: string;
  onBack: () => void;
};

export function AssessmentDetailPage({ assessmentId, onBack }: Props) {
  const data = getAssessmentDetail(assessmentId);
  const [modalOpen, setModalOpen] = useState(false);
  const [showResult, setShowResult] = useState(false);

  if (showResult) {
    return (
      <AssessmentResultPage
        assessmentId={assessmentId}
        onBack={() => setShowResult(false)}
      />
    );
  }

  if (!data) {
    return (
      <Box sx={{ display: 'flex', height: '100vh', background: tokens.pageBg }}>
        <DashboardSidebar activePage="Assessments" />
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography color={tokens.textMuted}>Assessment not found.</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', background: tokens.pageBg }}>
      <DashboardSidebar activePage="Assessments" />

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Box sx={{ p: 3 }}>
          <AssessmentHeaderCard
            data={data}
            onBack={onBack}
            onLaunch={() => setModalOpen(true)}
            onResult={() => setShowResult(true)}
          />
          <AssessmentGuidelinesSection
            guidelines={data.guidelines}
            scoringTable={data.scoringTable}
          />
        </Box>
      </Box>

      <AssessmentLaunchModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onStart={() => {
          setModalOpen(false);
          // TODO: navigate to quiz
        }}
        data={data}
      />
    </Box>
  );
}