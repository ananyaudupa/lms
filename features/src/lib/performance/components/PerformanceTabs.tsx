import { Box, Typography } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export type PerformanceTab = 'overview' | 'courses' | 'certifications' | 'attendance';

type Props = {
  activeTab: PerformanceTab;
  onChange: (tab: PerformanceTab) => void;
};

const tabs: { id: PerformanceTab; label: string; icon: React.ReactNode }[] = [
  { id: 'overview',       label: 'Overview',              icon: <TimelineIcon fontSize="small" /> },
  { id: 'courses',        label: 'Courses & Assessments', icon: <MenuBookIcon fontSize="small" /> },
  { id: 'certifications', label: 'Certifications',        icon: <WorkspacePremiumIcon fontSize="small" /> },
  { id: 'attendance',     label: 'Attendance',            icon: <CalendarMonthIcon fontSize="small" /> },
];

const BRAND = '#10148f';

export function PerformanceTabs({ activeTab, onChange }: Props) {
  return (
    <Box sx={{
      background: '#fff', borderRadius: 3, p: 1.5, mb: 3,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      display: 'flex', gap: 1,
    }}>
      {tabs.map(tab => {
        const isActive = tab.id === activeTab;
        return (
          <Box
            key={tab.id}
            onClick={() => onChange(tab.id)}
            sx={{
              display: 'flex', alignItems: 'center', gap: 1,
              px: 2.5, py: 1.2, borderRadius: 2, cursor: 'pointer',
              background: isActive ? BRAND : 'transparent',
              color: isActive ? '#fff' : BRAND,
              transition: 'all 0.2s',
              '&:hover': { background: isActive ? BRAND : '#f1f5f9' },
            }}
          >
            {tab.icon}
            <Typography fontSize={14} fontWeight={isActive ? 700 : 600} color="inherit">
              {tab.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}