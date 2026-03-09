import { Box, Typography, Tab, Tabs, InputAdornment, TextField, Select, MenuItem, Button, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LayersIcon from '@mui/icons-material/Layers';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useState } from 'react';
import { DashboardSidebar } from '../../dashboard/components/sidebar';
import { CourseCard } from '../components/CourseCard';
import { tokens } from '@org/shared';

const roleBasedCourses = [
  { title: 'Frontend', description: 'Build modern, responsive, and interactive user interfaces with cutting-edge frontend technologies.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=220&fit=crop', enrolled: true, progress: 17 },
  { title: 'Backend', description: 'Design robust, scalable, and secure server-side systems that power seamless digital experiences.', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=220&fit=crop', enrolled: false },
  { title: 'Full Stack', description: 'Develop end-to-end applications by mastering both frontend and backend technologies for complete web solutions.', image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&h=220&fit=crop', enrolled: false },
  { title: 'DevOps', description: 'Streamline development and deployment with automation, CI/CD, and scalable cloud infrastructure practices.', image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=220&fit=crop', enrolled: false },
  { title: 'DevSecOps', description: 'Integrate security into every stage of development and operations to build resilient, secure, and compliant systems.', image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=220&fit=crop', enrolled: false },
  { title: 'Data Analyst', description: 'Turn raw data into actionable insights using analytics, visualization, and data-driven decision-making.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=220&fit=crop', enrolled: false },
  { title: 'AI Engineer', description: 'Build modern, responsive, and interactive user interfaces with cutting-edge frontend technologies.', image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=220&fit=crop', enrolled: false },
  { title: 'AI & Data Scientist', description: 'Leverage AI and data science to uncover insights, build predictive models, and drive smarter decisions.', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=220&fit=crop', enrolled: false },
  { title: 'Data Engineer', description: 'Build scalable data pipelines and architectures to collect, process, and deliver reliable data for analytics and AI.', image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=220&fit=crop', enrolled: false },
  { title: 'Android', description: 'Design and build high-performance Android apps with modern tools, seamless UX, and scalable architecture.', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=220&fit=crop', enrolled: false },
  { title: 'Machine Learning', description: 'Build intelligent models that learn from data to make predictions, automate tasks, and drive smarter solutions.', image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=220&fit=crop', enrolled: false },
  { title: 'PostgreSQL', description: 'Turn raw data into actionable insights using analytics, visualization, and data-driven decision-making.', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=220&fit=crop', enrolled: false },
];

const upskillingCourses = [
  { title: 'SQL', description: 'Master SQL to efficiently manage, query, and analyze data across relational databases.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=220&fit=crop', enrolled: true, progress: 40 },
  { title: 'Computer Science', description: 'Master core computing principles—from algorithms to systems—to solve complex problems and build efficient software.', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=220&fit=crop', enrolled: false },
  { title: 'React', description: 'Build dynamic, component-based user interfaces with React for fast, scalable, and modern web applications.', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=220&fit=crop', enrolled: false },
  { title: 'Vue', description: 'Create lightweight, reactive, and flexible user interfaces with Vue for modern web applications.', image: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=400&h=220&fit=crop', enrolled: false },
  { title: 'Angular', description: 'Build scalable, enterprise-grade web applications with Angular using a structured, component-driven architecture.', image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=220&fit=crop', enrolled: false },
  { title: 'JavaScript', description: 'Master JavaScript to build dynamic, interactive, and high-performance web applications.', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=220&fit=crop', enrolled: false },
  { title: 'TypeScript', description: 'Build modern, responsive, and interactive user interfaces with cutting-edge frontend technologies.', image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=220&fit=crop', enrolled: false },
  { title: 'Node.js', description: 'Leverage AI and data science to uncover insights, build predictive models, and drive smarter decisions.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=220&fit=crop', enrolled: false },
  { title: 'Python', description: 'Build scalable data pipelines and architectures to collect, process, and deliver reliable data for analytics and AI.', image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=220&fit=crop', enrolled: false },
  { title: 'System Design', description: 'Design and build high-performance Android apps with modern tools, seamless UX, and scalable architecture.', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=220&fit=crop', enrolled: false },
  { title: 'Java', description: 'Build intelligent models that learn from data to make predictions, automate tasks, and drive smarter solutions.', image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&h=220&fit=crop', enrolled: false },
  { title: 'ASP.NET Core', description: 'Turn raw data into actionable insights using analytics, visualization, and data-driven decision-making.', image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=220&fit=crop', enrolled: false },
];

export function CoursesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All Courses');

  const courses = activeTab === 0 ? roleBasedCourses : upskillingCourses;
  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', background: tokens.pageBg }}>
      <DashboardSidebar activePage="Courses" />

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {/* Header */}
        <Box sx={{ background: tokens.headerBg, px: 4, py: 3, borderBottom: `1px solid ${tokens.borderColor}` }}>
          <Typography variant="h4" fontWeight={800} sx={{ color: tokens.textHeading, mb: 0.5 }}>
            Learning Hub
          </Typography>
          <Typography sx={{ color: tokens.textMuted, fontSize: 15 }}>
            Choose from role-based learning paths or individual courses
          </Typography>
        </Box>

        <Box sx={{ px: 4, py: 3 }}>
          {/* Tabs + Search row */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
            {/* Tab buttons */}
            <Box sx={{ display: 'flex', background: tokens.cardBg, borderRadius: 2, border: `1px solid ${tokens.borderColor}`, overflow: 'hidden', flex: '0 0 auto' }}>
              <Button
                startIcon={<LayersIcon />}
                onClick={() => setActiveTab(0)}
                sx={{
                  px: 3, py: 1.5, borderRadius: 0, textTransform: 'none', fontWeight: 700, fontSize: 15,
                  background: activeTab === 0 ? tokens.btnPrimary : 'transparent',
                  color: activeTab === 0 ? '#fff' : tokens.primary,
                  '&:hover': { background: activeTab === 0 ? tokens.btnPrimaryHover : '#f1f5f9' },
                }}
              >
                Role Based Learning
              </Button>
              <Button
                startIcon={<RocketLaunchIcon />}
                onClick={() => setActiveTab(1)}
                sx={{
                  px: 3, py: 1.5, borderRadius: 0, textTransform: 'none', fontWeight: 700, fontSize: 15,
                  background: activeTab === 1 ? tokens.btnPrimary : 'transparent',
                  color: activeTab === 1 ? '#fff' : tokens.primary,
                  '&:hover': { background: activeTab === 1 ? tokens.btnPrimaryHover : '#f1f5f9' },
                }}
              >
                Upskilling Track
              </Button>
            </Box>

            <Box sx={{ flex: 1 }} />

            {/* Search */}
            <TextField
              placeholder="Search"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: tokens.textMuted }} /></InputAdornment>,
              }}
              sx={{ background: tokens.cardBg, borderRadius: 2, minWidth: 280, '& fieldset': { borderColor: tokens.borderColor } }}
            />

            {/* Filter */}
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              size="small"
              sx={{ background: tokens.cardBg, minWidth: 150, borderRadius: 2, '& fieldset': { borderColor: tokens.borderColor } }}
            >
              <MenuItem value="All Courses">All Courses</MenuItem>
              <MenuItem value="Enrolled">Enrolled</MenuItem>
              <MenuItem value="Not Started">Not Started</MenuItem>
            </Select>
          </Box>

          {/* Section title */}
          <Typography variant="h5" fontWeight={800} sx={{ color: tokens.textPrimary, mb: 0.5 }}>
            {activeTab === 0 ? 'Role Based Learning' : 'Skill Based Upskilling Tracks'}
          </Typography>
          <Typography sx={{ color: tokens.textMuted, fontSize: 14, mb: 3 }}>
            {activeTab === 0
              ? 'Enrol scheduled courses with structured topic trees and assignments'
              : 'Structured upskilling tracks designed for specific career roles'}
          </Typography>

          {/* Course grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
            {filtered.map((course) => (
              <CourseCard key={course.title} {...course} />
            ))}
       
          </Box>
        </Box>
      </Box>
    </Box>
  );
}