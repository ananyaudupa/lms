import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { skillProficiencyData } from '../data/performance.data';
import { tokens } from '@org/shared';

type LabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  outerRadius: number;
  name: string;
  value: number;
  fill: string;
};

const renderCustomLabel = ({
  cx, cy, midAngle, outerRadius, name, value, fill,
}: LabelProps) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 44;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x} y={y}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={11}
      fontWeight={600}
      fill={fill}
    >
      {`${name}:`}
      <tspan x={x} dy="1.2em" fontSize={11} fontWeight={700}>{`${value}%`}</tspan>
    </text>
  );
};

// Compact label for mobile — no text, just tooltip
const renderNoLabel = () => null;

export function SkillProficiencyCard() {
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
        Skill Proficiency
      </Typography>
      <ResponsiveContainer width="100%" height={isMobile ? 220 : 300}>
        <PieChart>
          <Pie
            data={skillProficiencyData}
            cx="50%"
            cy="50%"
            outerRadius={isMobile ? 65 : 90}
            dataKey="value"
            labelLine={!isMobile}
            label={isMobile ? renderNoLabel : renderCustomLabel}
          >
            {skillProficiencyData.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v: ValueType, name: NameType) => [`${v}%`, name]}
            contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend on mobile since labels are hidden */}
      {isMobile && (
        <Box sx={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 0.8, mt: 1.5,
        }}>
          {skillProficiencyData.map((entry, idx) => (
            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: entry.color, flexShrink: 0 }} />
              <Typography fontSize={10} color="#475569" fontWeight={600}>
                {entry.name}: {entry.value}%
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}