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

      <Box sx={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>
        <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>

          {/* Page header */}
          <Box sx={{
            background: '#fff',
            borderRadius: 3,
            p: { xs: 2, sm: 2.5, md: 3 },
            mb: 3,
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}>
            <Typography
              fontWeight={900}
              color={tokens.primary}
              sx={{ fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2rem' } }}
            >
              Master Assessment
            </Typography>
            <Typography
              color="#64748b"
              sx={{ fontSize: { xs: 13, sm: 14, md: 15 }, mt: 0.5 }}
            >
              Comprehensive assessment of your learning progress
            </Typography>
          </Box>

          {/* Grid of cards — 1 col mobile, 2 col tablet, 3 col desktop */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: { xs: 2, sm: 2.5, md: 3 },
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