import { Box, Typography, LinearProgress } from '@mui/material';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import type { AssessmentRow } from '../data/coursesAssessments.data';

const BRAND = '#10148f';

type Props = {
  rows: AssessmentRow[];
};

function SortableHeader({ label }: { label: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
      <Typography fontWeight={700} fontSize={14} color={BRAND}>{label}</Typography>
      <UnfoldMoreIcon sx={{ fontSize: 16, color: BRAND }} />
    </Box>
  );
}

export function MasterAssessmentPerformanceTable({ rows }: Props) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography fontWeight={900} color={BRAND} mb={0.5}
        sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' } }}
      >
        Master Assessment Performance
      </Typography>
      <Typography color="#64748b" mb={2} sx={{ fontSize: { xs: 12, sm: 13 } }}>
        Comprehensive assessment results across key competencies
      </Typography>

      {/* Horizontally scrollable on mobile */}
      <Box sx={{ overflowX: 'auto', borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <Box sx={{ minWidth: 580 }}>
          {/* Header */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1.2fr 2fr 1fr',
            px: 3, py: 1.8,
            borderBottom: '1.5px solid #f1f5f9',
            background: '#fafafa',
          }}>
            <Typography fontWeight={700} fontSize={14} color={BRAND}>Title</Typography>
            <SortableHeader label="Attempts" />
            <SortableHeader label="Best Score" />
            <SortableHeader label="Progress Range" />
            <SortableHeader label="Status" />
          </Box>

          {/* Rows */}
          {rows.map((row, idx) => {
            const isPassed = row.status === 'Passed';
            return (
              <Box
                key={idx}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1.2fr 2fr 1fr',
                  px: 3, py: 2,
                  borderBottom: idx < rows.length - 1 ? '1px solid #f1f5f9' : 'none',
                  alignItems: 'center',
                  background: '#fff',
                  '&:hover': { background: '#f8fafc' },
                }}
              >
                <Typography fontSize={13} fontWeight={500} color="#1e293b" sx={{ pr: 2 }}>
                  {row.title}
                </Typography>

                <Typography fontSize={14} fontWeight={800} color="#1e293b">
                  {row.attempts}
                </Typography>

                <Typography fontSize={14} fontWeight={800} color="#1e293b">
                  {row.bestScore}/{row.maxScore}
                </Typography>

                <Box sx={{ pr: 3 }}>
                  <LinearProgress
                    variant="determinate"
                    value={row.progressRange}
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

                <Box sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 0.5,
                  px: 1.2, py: 0.4, borderRadius: 5,
                  background: isPassed ? '#f0fdf4' : '#fff5f5',
                  border: `1px solid ${isPassed ? '#bbf7d0' : '#fecaca'}`,
                  width: 'fit-content',
                }}>
                  <FiberManualRecordIcon sx={{ fontSize: 8, color: isPassed ? '#16a34a' : '#dc2626' }} />
                  <Typography fontSize={12} fontWeight={700} color={isPassed ? '#16a34a' : '#dc2626'}>
                    {row.status}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}