import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DashboardSidebar } from '../../dashboard/components/sidebar';
import { AssessmentCard } from '../components/AssessmentCard';
import { AssessmentDetailPage } from './AssessmentDetailPage';
import { assessments } from '../data/assessment.data';
import { tokens } from '@org/shared';

export function AssessmentsListPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (selectedId) {
    return (
      <AssessmentDetailPage
        assessmentId={selectedId}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', background: tokens.pageBg }}>
      <DashboardSidebar activePage="Assessments" />

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Box sx={{ p: 3 }}>

          {/* Page header */}
          <Box sx={{
            background: '#fff',
            borderRadius: 3,
            p: 3,
            mb: 3,
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}>
            <Typography fontWeight={900} fontSize={32} color={tokens.primary}>
              Master Assessment
            </Typography>
            <Typography fontSize={15} color="#64748b" mt={0.5}>
              Comprehensive assessment of your learning progress
            </Typography>
          </Box>

          {/* Grid of cards */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 3,
          }}>
            {assessments.map((a) => (
              <AssessmentCard
                key={a.id}
                assessment={a}
                onClick={() => setSelectedId(a.id)}
              />
            ))}
          </Box>

        </Box>
      </Box>
    </Box>
  );
}