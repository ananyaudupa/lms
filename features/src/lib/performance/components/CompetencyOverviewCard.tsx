import { Box, Typography } from '@mui/material';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip,
} from 'recharts';
import { competencyData } from '../data/performance.data';
import { tokens } from '@org/shared';

export function CompetencyOverviewCard() {
  return (
    <Box sx={{
      background: '#fff', borderRadius: 3, p: 3,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)', flex: 1,
    }}>
      <Typography fontWeight={800} fontSize={20} color={tokens.primary} mb={2}>
        Competency Overview
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={competencyData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 12, fill: '#475569', fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            tickCount={5}
          />
          <Radar
            name="Competency"
            dataKey="value"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.18}
            strokeWidth={2}
            dot={{ fill: '#1e3a8a', r: 4 }}
          />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}
            formatter={(v: number) => [`${v}%`, 'Score']}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
}