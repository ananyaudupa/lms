import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { TooltipProps } from 'recharts';
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { attendanceStats, weeklyAttendancePattern } from '../data/attendance.data';

const BRAND = '#10148f';

type StatCardProps = {
  label: string;
  value: string | number;
  sub: string;
  accentColor: string;
};

function StatCard({ label, value, sub, accentColor }: StatCardProps) {
  return (
    <Box sx={{
      flex: 1, borderRadius: 3,
      border: '1.5px solid #e2e8f0',
      borderLeft: `5px solid ${accentColor}`,
      background: '#fff',
      p: { xs: 1.5, sm: 2, md: 2.5 },
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      minWidth: 0,
    }}>
      <Typography color="#475569" fontWeight={500} mb={1}
        sx={{ fontSize: { xs: 11, sm: 13, md: 15 } }}
      >
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.3 }}>
        <Typography fontWeight={900} color="#0f172a" lineHeight={1}
          sx={{ fontSize: { xs: 28, sm: 36, md: 42 } }}
        >
          {value}
        </Typography>
        {label === 'Attendance' && (
          <Typography fontWeight={900} color="#0f172a"
            sx={{ fontSize: { xs: 16, sm: 20, md: 24 }, lineHeight: 1.6 }}
          >
            %
          </Typography>
        )}
      </Box>
      <Typography color="#94a3b8" mt={1}
        sx={{ fontSize: { xs: 10, sm: 12, md: 13 } }}
      >
        {sub}
      </Typography>
    </Box>
  );
}

type TooltipEntry = { name: string; value: number; color: string };
type CustomTooltipProps = TooltipProps<ValueType, NameType> & {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  const order = ['absent', 'late', 'present'];
  const sorted = [...payload].sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
  return (
    <Box sx={{
      background: '#fff', border: '1.5px solid #e2e8f0',
      borderRadius: 2, p: 2, boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
      minWidth: 140,
    }}>
      <Typography fontWeight={900} fontSize={15} color="#0f172a" mb={1}>{label}</Typography>
      {sorted.map((entry, i) => (
        <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
          <Typography fontSize={13} fontWeight={600} color={entry.color} sx={{ textTransform: 'capitalize' }}>
            {entry.name.charAt(0).toUpperCase() + entry.name.slice(1)}:
          </Typography>
          <Typography fontSize={13} fontWeight={800} color={entry.color} ml={2}>
            {entry.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export function AttendanceTab() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <Typography fontWeight={900} color={BRAND} mb={2.5}
        sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' } }}
      >
        My Attendance Stat
      </Typography>

      {/* 4 stat cards — 2×2 on mobile, 4-in-a-row on sm+ */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
        gap: { xs: 1.5, sm: 2, md: 2.5 },
        mb: 3,
      }}>
        <StatCard label="Total Present" value={attendanceStats.totalPresent}   sub={`out of ${attendanceStats.totalSessions} sessions`} accentColor="#16a34a" />
        <StatCard label="Total Late"    value={attendanceStats.totalLate}      sub="sessions arrived late"  accentColor="#f59e0b" />
        <StatCard label="Total Absent"  value={attendanceStats.totalAbsent}    sub="sessions missed"        accentColor="#ef4444" />
        <StatCard label="Attendance"    value={attendanceStats.attendanceRate} sub="avg attendance rate"    accentColor="#3b82f6" />
      </Box>

      {/* Weekly pattern chart */}
      <Box sx={{
        background: '#fff', borderRadius: 3,
        p: { xs: 2, sm: 2.5, md: 3 },
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}>
        <Typography fontWeight={900} color={BRAND} mb={3}
          sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.4rem' } }}
        >
          Weekly Attendance Pattern
        </Typography>
        <ResponsiveContainer width="100%" height={isMobile ? 260 : 380}>
          <BarChart
            data={weeklyAttendancePattern}
            margin={{ top: 0, right: isMobile ? 8 : 20, left: isMobile ? 0 : 20, bottom: 0 }}
            barCategoryGap="40%"
          >
            <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="#f1f5f9" />
            <XAxis
              dataKey="week"
              tick={{ fontSize: isMobile ? 10 : 13, fill: '#64748b' }}
              axisLine={false} tickLine={false}
            />
            <YAxis
              tick={{ fontSize: isMobile ? 10 : 12, fill: '#64748b' }}
              axisLine={false} tickLine={false} allowDecimals={false}
              width={isMobile ? 24 : 40}
              label={isMobile ? undefined : {
                value: 'Sessions', angle: -90, position: 'insideLeft', offset: -5,
                style: { fontSize: 13, fill: '#475569', fontWeight: 600 },
              }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
            <Legend
              iconType="square" iconSize={10}
              formatter={(value: string) => (
                <span style={{ fontSize: isMobile ? 11 : 13, color: '#475569', fontWeight: 600 }}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              )}
            />
            <Bar dataKey="present" stackId="a" fill="#10b981" name="present" />
            <Bar dataKey="late"    stackId="a" fill="#f59e0b" name="late" />
            <Bar dataKey="absent"  stackId="a" fill="#ef4444" name="absent" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}