import Grid from '@mui/material/Grid';
import BookIcon from '@mui/icons-material/MenuBook';
import GradeIcon from '@mui/icons-material/EmojiEvents';
import CertIcon from '@mui/icons-material/WorkspacePremium';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BoltIcon from '@mui/icons-material/Bolt';
import { StatCard } from './StatCard';
import { tokens } from '@org/shared';

const stats = [
  {
    label: 'Roll Based Courses',
    value: '4',
    sub: 'Active Learning',
    subIcon: <TrendingUpIcon sx={{ fontSize: 14 }} />,
    icon: <BookIcon sx={{ fontSize: 22 }} />,
    bg: `linear-gradient(135deg, ${tokens.statCard1} 0%, ${tokens.statCard1}cc 100%)`,
  },
  {
    label: 'Upskilling Courses',
    value: '2',
    sub: 'Skill Upgrade',
    subIcon: <BoltIcon sx={{ fontSize: 14 }} />,
    icon: <BookIcon sx={{ fontSize: 22 }} />,
    bg: `linear-gradient(135deg, ${tokens.statCard2} 0%, ${tokens.statCard2}cc 100%)`,
  },
  {
    label: 'Average Grade',
    value: '92%',
    sub: 'Excellent Progress',
    subIcon: <StarIcon sx={{ fontSize: 14 }} />,
    icon: <GradeIcon sx={{ fontSize: 22 }} />,
    bg: `linear-gradient(135deg, ${tokens.statCard3} 0%, ${tokens.statCard3}cc 100%)`,
  },
  {
    label: 'Certifications',
    value: '1',
    sub: 'Keep it going!',
    subIcon: <CheckCircleIcon sx={{ fontSize: 14 }} />,
    icon: <CertIcon sx={{ fontSize: 22 }} />,
    bg: `linear-gradient(135deg, ${tokens.statCard4} 0%, ${tokens.statCard4}cc 100%)`,
  },
];

export function DashboardStatsCards() {
  return (
    <Grid container spacing={2.5}>
      {stats.map((stat) => (
        <Grid key={stat.label} size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
}