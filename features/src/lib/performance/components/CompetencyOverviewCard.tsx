import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip,
} from 'recharts';
import type { ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { competencyData } from '../data/performance.data';
import { tokens } from '@org/shared';

export function CompetencyOverviewCard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{
      background: '#fff', borderRadius: 3,
      p: { xs: 2, sm: 2.5, md: 3 },
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      flex: 1, minWidth: 0,
    }}>
      <Typography fontWeight={800} color={tokens.primary} mb={2}
        sx={{ fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' } }}
      >
        Competency Overview
      </Typography>
      <ResponsiveContainer width="100%" height={isMobile ? 220 : 300}>
        <RadarChart
          data={competencyData}
          margin={{ top: 10, right: isMobile ? 20 : 30, bottom: 10, left: isMobile ? 20 : 30 }}
        >
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: isMobile ? 10 : 12, fill: '#475569', fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fontSize: isMobile ? 8 : 10, fill: '#94a3b8' }}
            tickCount={5}
          />
          <Radar
            name="Competency"
            dataKey="value"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.18}
            strokeWidth={2}
            dot={{ fill: '#1e3a8a', r: isMobile ? 3 : 4 }}
          />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
            formatter={(v: ValueType) => [`${v}%`, 'Score']}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
}