import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { skillProficiencyData } from '../data/performance.data';
import { tokens } from '@org/shared';

// Custom label rendered outside the pie
const renderCustomLabel = ({
  cx, cy, midAngle, outerRadius, name, value, fill,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 48;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x} y={y}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
      fill={fill}
    >
      {`${name}:`}
      <tspan x={x} dy="1.2em" fontSize={12} fontWeight={700}>{`${value}%`}</tspan>
    </text>
  );
};

export function SkillProficiencyCard() {
  return (
    <Box sx={{
      background: '#fff', borderRadius: 3, p: 3,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)', flex: 1,
    }}>
      <Typography fontWeight={800} fontSize={20} color={tokens.primary} mb={2}>
        Skill Proficiency
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={skillProficiencyData}
            cx="50%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
            labelLine={false}
            label={renderCustomLabel}
          >
            {skillProficiencyData.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v: number, name: string) => [`${v}%`, name]}
            contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}