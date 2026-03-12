import { useState } from 'react';
import { Box, Typography, Avatar, Divider, Tooltip } from '@mui/material';
import DashboardIcon from '@mui/icons-material/GridView';
import CoursesIcon from '@mui/icons-material/MenuBook';
import AssessmentsIcon from '@mui/icons-material/Assignment';
import PerformanceIcon from '@mui/icons-material/Insights';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo.png';
import { tokens } from '@org/shared';

const navItems = [
  { label: 'Dashboard',      icon: <DashboardIcon />,   path: '/dashboard' },
  { label: 'Courses',        icon: <CoursesIcon />,     path: '/courses' },
  { label: 'Assessments',    icon: <AssessmentsIcon />, path: '/assessments' },
  { label: 'My Performance', icon: <PerformanceIcon />, path: '/performance' },
];

type Props = { activePage?: string };

export function DashboardSidebar({ activePage = 'Dashboard' }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box sx={{
      width: collapsed ? 72 : 260,
      minHeight: '100vh',
      background: `linear-gradient(180deg, ${tokens.sidebarBgFrom} 0%, ${tokens.sidebarBgTo} 100%)`,
      display: 'flex', flexDirection: 'column',
      py: 3, px: collapsed ? 1 : 2,
      flexShrink: 0,
      transition: 'width 0.25s ease, padding 0.25s ease',
      overflow: 'hidden',
    }}>

      {/* Logo row — click anywhere to toggle */}
      <Box
        onClick={() => setCollapsed(prev => !prev)}
        sx={{
          display: 'flex', alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          px: 1, mb: 4, cursor: 'pointer',
          '&:hover': { opacity: 0.85 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, overflow: 'hidden' }}>
          <Box
            component="img"
            src={logo}
            alt="Synterra"
            sx={{ width: 40, minWidth: 40, mixBlendMode: 'screen' }}
          />
          {!collapsed && (
            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 26, whiteSpace: 'nowrap' }}>
              Synterra
            </Typography>
          )}
        </Box>

        {/* Hamburger icon — only visible when expanded */}
        {!collapsed && (
          <MenuOpenIcon sx={{ color: 'rgba(255,255,255,0.6)', fontSize: 22, flexShrink: 0 }} />
        )}
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 3 }} />

      {/* Nav items */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
        {navItems.map((item) => {
          const isActive = activePage === item.label;
          return (
            <Tooltip key={item.label} title={collapsed ? item.label : ''} placement="right" arrow>
              <Box
                onClick={() => { window.location.href = item.path; }}
                sx={{
                  display: 'flex', alignItems: 'center',
                  gap: collapsed ? 0 : 1.5,
                  px: collapsed ? 1.5 : 2, py: 1.5,
                  borderRadius: 2, cursor: 'pointer',
                  justifyContent: collapsed ? 'center' : 'flex-start',
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
                }}
              >
                {item.icon}
                {!collapsed && (
                  <Typography sx={{ fontWeight: isActive ? 700 : 400, fontSize: 15, whiteSpace: 'nowrap' }}>
                    {item.label}
                  </Typography>
                )}
              </Box>
            </Tooltip>
          );
        })}
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />

      {/* User info */}
      <Tooltip title={collapsed ? 'Adam' : ''} placement="right" arrow>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1, mb: 2, overflow: 'hidden', justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <Avatar sx={{
            width: 38, height: 38, flexShrink: 0,
            background: `linear-gradient(135deg, ${tokens.primary}, ${tokens.secondary})`,
          }}>A</Avatar>
          {!collapsed && (
            <Box sx={{ overflow: 'hidden' }}>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}>
                Adam
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Adam@Synterralearning.com
              </Typography>
            </Box>
          )}
        </Box>
      </Tooltip>

      {/* Sign Out */}
      <Tooltip title={collapsed ? 'Sign Out' : ''} placement="right" arrow>
        <Box
          onClick={() => { window.location.href = '/login'; }}
          sx={{
            display: 'flex', alignItems: 'center',
            gap: collapsed ? 0 : 1.5,
            px: collapsed ? 1.5 : 2, py: 1.5,
            borderRadius: 2, cursor: 'pointer',
            justifyContent: collapsed ? 'center' : 'flex-start',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.7)',
            '&:hover': { background: 'rgba(255,255,255,0.08)', color: '#fff' },
            transition: 'all 0.2s',
          }}
        >
          <LogoutIcon fontSize="small" />
          {!collapsed && (
            <Typography sx={{ fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap' }}>
              Sign Out
            </Typography>
          )}
        </Box>
      </Tooltip>

    </Box>
  );
}