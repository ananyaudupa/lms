import { Box, Typography } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import type { TooltipProps } from 'recharts';
import { masterAssessmentData } from '../data/performance.data';
import { tokens } from '@org/shared';

type PayloadItem = {
  name: string;
  value: number;
  color: string;
};

type CustomTooltipProps = TooltipProps<ValueType, NameType> & {
  active?: boolean;
  payload?: PayloadItem[];
  label?: string;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <Box sx={{
      background: '#fff', border: '1.5px solid #e2e8f0',
      borderRadius: 2, p: 1.5, boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    }}>
      <Typography fontWeight={800} fontSize={14} color="#0f172a" mb={0.5}>
        {label}
      </Typography>
      {payload.map((p: PayloadItem, i: number) => (
        <Typography key={i} fontSize={13} color={p.color} fontWeight={600}>
          {p.name === 'scoreObtained' ? 'Score Obtain' : 'Bench Mark'}
          {'  :  '}{p.value}
        </Typography>
      ))}
    </Box>
  );
};

export function MasterAssessmentOverview() {
  return (
    <Box sx={{
      background: '#fff', borderRadius: 3, p: 3, mt: 3,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    }}>
      <Typography fontWeight={800} fontSize={20} color={tokens.primary} mb={3}>
        Master Assessment Overview
      </Typography>

      <ResponsiveContainer width="100%" height={masterAssessmentData.length * 56 + 60}>
        <BarChart
          layout="vertical"
          data={masterAssessmentData}
          margin={{ top: 0, right: 30, left: 60, bottom: 20 }}
          barCategoryGap="30%"
          barGap={4}
        >
          <CartesianGrid horizontal={false} strokeDasharray="4 4" stroke="#f1f5f9" />
          <XAxis
            type="number"
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tick={{ fontSize: 12, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 13, fill: '#475569', fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            width={90}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
          <Legend
            iconType="square"
            iconSize={12}
            formatter={(value: string) => (
              <span style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>
                {value === 'scoreObtained' ? 'Score Obtained' : 'Benchmark'}
              </span>
            )}
          />
          <Bar dataKey="scoreObtained" name="scoreObtained" fill="#16a34a" radius={[0, 3, 3, 0]} barSize={12} />
          <Bar dataKey="benchmark"     name="benchmark"     fill="#fbbf24" radius={[0, 3, 3, 0]} barSize={12} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}