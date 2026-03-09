import { Box, Typography, Avatar, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/GridView';
import CoursesIcon from '@mui/icons-material/MenuBook';
import AssessmentsIcon from '@mui/icons-material/Assignment';
import PerformanceIcon from '@mui/icons-material/Insights';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../assets/logo.png';
import { tokens } from '@org/shared';

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { label: 'Courses', icon: <CoursesIcon />, path: '/courses' },
  { label: 'Assessments', icon: <AssessmentsIcon />, path: '/assessments' },
  { label: 'My Performance', icon: <PerformanceIcon />, path: '/performance' },
];

type Props = { activePage?: string };

export function DashboardSidebar({ activePage = 'Dashboard' }: Props) {

  return (
    <Box sx={{
      width: 260, minHeight: '100vh',
      background: `linear-gradient(180deg, ${tokens.sidebarBgFrom} 0%, ${tokens.sidebarBgTo} 100%)`,
      display: 'flex', flexDirection: 'column', py: 3, px: 2, flexShrink: 0,
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1, mb: 4 }}>
        <Box component="img" src={logo} alt="Synterra" sx={{ width: 55, mixBlendMode: 'screen' }} />
        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 30 }}>Synterra</Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 3 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
        {navItems.map((item) => {
          const isActive = activePage === item.label;
          return (
            <Box key={item.label} onClick={() => window.location.href = item.path} sx={{
              display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.5,
              borderRadius: 2, cursor: 'pointer',
              background: isActive
                ? `linear-gradient(90deg, ${tokens.sidebarActiveFrom}, ${tokens.sidebarActiveTo})`
                : 'transparent',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
              transition: 'all 0.2s',
              '&:hover': {
                background: isActive
                  ? `linear-gradient(90deg, ${tokens.sidebarActiveFrom}, ${tokens.sidebarActiveTo})`
                  : 'rgba(255,255,255,0.08)',
                color: '#fff',
              },
            }}>
              {item.icon}
              <Typography sx={{ fontWeight: isActive ? 700 : 400, fontSize: 15 }}>{item.label}</Typography>
            </Box>
          );
        })}
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1, mb: 2 }}>
        <Avatar sx={{ width: 38, height: 38, background: `linear-gradient(135deg, ${tokens.primary}, ${tokens.secondary})` }}>A</Avatar>
        <Box>
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>Admin User</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Adam@Synterralearning.com</Typography>
        </Box>
      </Box>

      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.5,
        borderRadius: 2, cursor: 'pointer',
        border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)',
        '&:hover': { background: 'rgba(255,255,255,0.08)', color: '#fff' }, transition: 'all 0.2s',
      }}>
        <LogoutIcon fontSize="small" />
        <Typography sx={{ fontWeight: 600, fontSize: 14 }}>Sign Out</Typography>
      </Box>
    </Box>
  );
}