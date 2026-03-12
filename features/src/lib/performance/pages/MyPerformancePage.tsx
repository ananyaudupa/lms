import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DashboardSidebar } from '../../dashboard/components/sidebar';
import { PerformanceProfileCard } from '../components/PerformanceProfileCard';
import { PerformanceTabs, PerformanceTab } from '../components/PerformanceTabs';
import { CompetencyOverviewCard } from '../components/CompetencyOverviewCard';
import { SkillProficiencyCard } from '../components/SkillProficiencyCard';
import { MasterAssessmentOverview } from '../components/MasterAssessmentOverview';
import { CoursesAssessmentsTab } from '../components/CoursesAssessmentsTab';
import { CertificationsTab } from '../components/CertificationsTab';
import { AttendanceTab } from '../components/AttendanceTab';
import { tokens } from '@org/shared';

const BRAND = '#10148f';

export function MyPerformancePage() {
  const [activeTab, setActiveTab] = useState<PerformanceTab>('overview');

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', background: tokens.pageBg }}>
      <DashboardSidebar activePage="My Performance" />

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Box sx={{ p: 3 }}>

          {/* Page header */}
          <Box sx={{
            background: '#fff', borderRadius: 3, p: 3, mb: 3,
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}>
            <Typography fontWeight={900} fontSize={32} color={BRAND}>
              My Learning Performance
            </Typography>
            <Typography fontSize={14} color="#64748b" mt={0.5}>
              Track your academic progress and learning efficiency
            </Typography>
          </Box>

          {/* Profile card — always visible */}
          <PerformanceProfileCard />

          {/* Tabs */}
          <PerformanceTabs activeTab={activeTab} onChange={setActiveTab} />

          {/* Tab content */}
          {activeTab === 'overview' && (
            <>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <CompetencyOverviewCard />
                <SkillProficiencyCard />
              </Box>
              <MasterAssessmentOverview />
            </>
          )}

          {activeTab === 'courses'         && <CoursesAssessmentsTab />}
          {activeTab === 'certifications'  && <CertificationsTab />}
          {activeTab === 'attendance'      && <AttendanceTab />}

        </Box>
      </Box>
    </Box>
  );
}