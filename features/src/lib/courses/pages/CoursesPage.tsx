import { Box, Typography, TextField, InputAdornment, Select, MenuItem, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LayersIcon from '@mui/icons-material/Layers';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useState } from 'react';
import { DashboardSidebar } from '../../dashboard/components/sidebar';
import { CourseCard } from '../components/CourseCard';
import { tokens } from '@org/shared';
import { roleBasedCourses, upskillingCourses } from '@org/shared';

export function CoursesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All Courses');

  const courses = activeTab === 0 ? roleBasedCourses : upskillingCourses;
  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', background: tokens.pageBg }}>
      <DashboardSidebar activePage="Courses" />
      <Box sx={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>

        {/* Header */}
        <Box sx={{ background: tokens.headerBg, px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, md: 3 }, borderBottom: `1px solid ${tokens.borderColor}` }}>
          <Typography fontWeight={800} sx={{ color: tokens.textHeading, mb: 0.5, fontSize: { xs: '1.4rem', md: '2rem' } }}>
            Learning Hub
          </Typography>
          <Typography sx={{ color: tokens.textMuted, fontSize: { xs: 13, md: 15 } }}>
            Choose from role-based learning paths or individual courses
          </Typography>
        </Box>

        <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, md: 3 } }}>

          {/* Filters row */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
            {/* Tab toggle */}
            <Box sx={{
              display: 'flex', background: tokens.cardBg, borderRadius: 2,
              border: `1px solid ${tokens.borderColor}`, overflow: 'hidden',
              width: { xs: '100%', sm: 'auto' },
            }}>
              <Button startIcon={<LayersIcon />} onClick={() => setActiveTab(0)} sx={{
                flex: { xs: 1, sm: 'none' },
                px: { xs: 1.5, sm: 3 }, py: 1.5, borderRadius: 0,
                textTransform: 'none', fontWeight: 700, fontSize: { xs: 13, sm: 15 },
                background: activeTab === 0 ? tokens.btnPrimary : 'transparent',
                color: activeTab === 0 ? '#fff' : tokens.primary,
                '&:hover': { background: activeTab === 0 ? tokens.btnPrimaryHover : '#f1f5f9' },
              }}>Role Based</Button>
              <Button startIcon={<RocketLaunchIcon />} onClick={() => setActiveTab(1)} sx={{
                flex: { xs: 1, sm: 'none' },
                px: { xs: 1.5, sm: 3 }, py: 1.5, borderRadius: 0,
                textTransform: 'none', fontWeight: 700, fontSize: { xs: 13, sm: 15 },
                background: activeTab === 1 ? tokens.btnPrimary : 'transparent',
                color: activeTab === 1 ? '#fff' : tokens.primary,
                '&:hover': { background: activeTab === 1 ? tokens.btnPrimaryHover : '#f1f5f9' },
              }}>Upskilling</Button>
            </Box>

            <Box sx={{ flex: 1, display: { xs: 'none', sm: 'block' } }} />

            {/* Search + filter */}
            <Box sx={{ display: 'flex', gap: 1.5, width: { xs: '100%', sm: 'auto' }, flexWrap: 'wrap' }}>
              <TextField
                placeholder="Search"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: tokens.textMuted }} /></InputAdornment> }}
                sx={{
                  background: tokens.cardBg, borderRadius: 2,
                  flex: { xs: 1, sm: 'none' },
                  minWidth: { xs: 0, sm: 220 },
                  '& fieldset': { borderColor: tokens.borderColor },
                }}
              />
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                size="small"
                sx={{
                  background: tokens.cardBg,
                  minWidth: { xs: 140, sm: 150 },
                  borderRadius: 2,
                  '& fieldset': { borderColor: tokens.borderColor },
                }}
              >
                <MenuItem value="All Courses">All Courses</MenuItem>
                <MenuItem value="Enrolled">Enrolled</MenuItem>
                <MenuItem value="Not Started">Not Started</MenuItem>
              </Select>
            </Box>
          </Box>

          {/* Section title */}
          <Typography fontWeight={800} sx={{ color: tokens.textPrimary, mb: 0.5, fontSize: { xs: '1.1rem', md: '1.5rem' } }}>
            {activeTab === 0 ? 'Role Based Learning' : 'Skill Based Upskilling Tracks'}
          </Typography>
          <Typography sx={{ color: tokens.textMuted, fontSize: { xs: 13, md: 14 }, mb: 3 }}>
            {activeTab === 0
              ? 'Enrol scheduled courses with structured topic trees and assignments'
              : 'Structured upskilling tracks designed for specific career roles'}
          </Typography>

          {/* Course grid */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: { xs: 2, md: 3 },
          }}>
            {filtered.map((course) => (
              <CourseCard key={course.title} {...course} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}