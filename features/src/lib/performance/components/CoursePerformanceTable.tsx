import { Box, Typography, LinearProgress } from '@mui/material';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import type { CourseRow } from '../data/coursesAssessments.data';

const BRAND = '#10148f';

type Props = {
  title: string;
  subtitle: string;
  rows: CourseRow[];
};

function SortableHeader({ label }: { label: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
      <Typography fontWeight={700} fontSize={14} color={BRAND}>{label}</Typography>
      <UnfoldMoreIcon sx={{ fontSize: 16, color: BRAND }} />
    </Box>
  );
}

export function CoursePerformanceTable({ title, subtitle, rows }: Props) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography fontWeight={900} color={BRAND} mb={0.5}
        sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' } }}
      >
        {title}
      </Typography>
      <Typography color="#64748b" mb={2} sx={{ fontSize: { xs: 12, sm: 13 } }}>
        {subtitle}
      </Typography>

      {/* Horizontally scrollable wrapper on mobile */}
      <Box sx={{ overflowX: 'auto', borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <Box sx={{ minWidth: 540 }}>
          {/* Header */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: '2fr 2.5fr 1fr 1fr',
            px: 3, py: 1.8,
            borderBottom: '1.5px solid #f1f5f9',
            background: '#fafafa',
          }}>
            <Typography fontWeight={700} fontSize={14} color={BRAND}>Course</Typography>
            <SortableHeader label="Course Completion" />
            <SortableHeader label="Level" />
            <SortableHeader label="Avg. Marks" />
          </Box>

          {/* Rows */}
          {rows.map((row, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'grid',
                gridTemplateColumns: '2fr 2.5fr 1fr 1fr',
                px: 3, py: 2,
                borderBottom: idx < rows.length - 1 ? '1px solid #f1f5f9' : 'none',
                alignItems: 'center',
                background: '#fff',
                '&:hover': { background: '#f8fafc' },
              }}
            >
              <Typography fontSize={13} color="#1e293b" fontWeight={500} sx={{ pr: 2 }}>
                {row.name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pr: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={row.completion}
                    sx={{
                      height: 8, borderRadius: 5,
                      background: '#e2e8f0',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #10148f, #38bdf8)',
                        borderRadius: 5,
                      },
                    }}
                  />
                </Box>
                <Typography fontSize={12} fontWeight={600} color="#475569" sx={{ minWidth: 34 }}>
                  {row.completion}%
                </Typography>
              </Box>

              <Typography fontSize={14} fontWeight={800} color="#1e293b">{row.level}</Typography>
              <Typography fontSize={14} fontWeight={800} color="#1e293b">{row.avgMarks}%</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}