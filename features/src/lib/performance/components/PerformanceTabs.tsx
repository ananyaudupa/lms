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

const tabs: { id: PerformanceTab; label: string; shortLabel: string; icon: React.ReactNode }[] = [
  { id: 'overview',       label: 'Overview',              shortLabel: 'Overview',  icon: <TimelineIcon fontSize="small" /> },
  { id: 'courses',        label: 'Courses & Assessments', shortLabel: 'Courses',   icon: <MenuBookIcon fontSize="small" /> },
  { id: 'certifications', label: 'Certifications',        shortLabel: 'Certs',     icon: <WorkspacePremiumIcon fontSize="small" /> },
  { id: 'attendance',     label: 'Attendance',            shortLabel: 'Attend.',   icon: <CalendarMonthIcon fontSize="small" /> },
];

const BRAND = '#10148f';

export function PerformanceTabs({ activeTab, onChange }: Props) {
  return (
    <Box sx={{
      background: '#fff', borderRadius: 3,
      p: { xs: 1, sm: 1.5 },
      mb: 3,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      display: 'flex',
      gap: { xs: 0.5, sm: 1 },
      overflowX: 'auto',
      // Hide scrollbar but keep scrolling
      '&::-webkit-scrollbar': { display: 'none' },
      scrollbarWidth: 'none',
    }}>
      {tabs.map(tab => {
        const isActive = tab.id === activeTab;
        return (
          <Box
            key={tab.id}
            onClick={() => onChange(tab.id)}
            sx={{
              display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 },
              px: { xs: 1.5, sm: 2.5 },
              py: { xs: 1, sm: 1.2 },
              borderRadius: 2, cursor: 'pointer',
              background: isActive ? BRAND : 'transparent',
              color: isActive ? '#fff' : BRAND,
              transition: 'all 0.2s',
              flexShrink: 0,
              '&:hover': { background: isActive ? BRAND : '#f1f5f9' },
            }}
          >
            {tab.icon}
            {/* Full label on sm+, short label on xs */}
            <Typography
              fontWeight={isActive ? 700 : 600}
              color="inherit"
              sx={{
                fontSize: { xs: 12, sm: 14 },
                display: { xs: 'none', sm: 'block' },
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </Typography>
            <Typography
              fontWeight={isActive ? 700 : 600}
              color="inherit"
              sx={{
                fontSize: 11,
                display: { xs: 'block', sm: 'none' },
                whiteSpace: 'nowrap',
              }}
            >
              {tab.shortLabel}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}