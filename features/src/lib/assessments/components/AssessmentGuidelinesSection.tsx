import { Box, Typography, Divider } from '@mui/material';
import type { GuidelineSection, ScoringRow } from '../data/assessment.data';

type Props = {
  guidelines: GuidelineSection[];
  scoringTable: ScoringRow[];
};

export function AssessmentGuidelinesSection({ guidelines, scoringTable }: Props) {
  return (
    <Box sx={{
      background: '#fff',
      borderRadius: 3,
      p: { xs: 2, sm: 2.5, md: 3 },
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    }}>
      <Typography
        fontWeight={900}
        color="#1e40af"
        mb={3}
        sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' } }}
      >
        Assessment Guidelines
      </Typography>

      {guidelines.map((section, idx) => (
        <Box key={idx}>
          <Typography
            fontWeight={800}
            color="#0f172a"
            mb={1}
            sx={{
              fontSize: { xs: 15, sm: 16, md: 17 },
              display: 'flex', alignItems: 'center', gap: 1,
            }}
          >
            {section.emoji} {section.title}
          </Typography>

          {Array.isArray(section.content) ? (
            section.content.map((line, i) => (
              <Typography key={i} color="#334155" lineHeight={1.75} mb={0.8}
                sx={{ fontSize: { xs: 13, sm: 14, md: 14.5 } }}
              >
                {line}
              </Typography>
            ))
          ) : (
            <Typography color="#334155" lineHeight={1.75} mb={0.8}
              sx={{ fontSize: { xs: 13, sm: 14, md: 14.5 } }}
            >
              {section.content}
            </Typography>
          )}

          {/* Scoring table */}
          {section.title.includes('Scoring') && (
            <Box sx={{
              mt: 2, mb: 1,
              border: '1px solid #e2e8f0',
              borderRadius: 2,
              overflow: 'hidden',
            }}>
              {/* Table header — hide on mobile, show inline labels instead */}
              <Box sx={{
                display: { xs: 'none', sm: 'grid' },
                gridTemplateColumns: '2fr 1fr 4fr',
                background: '#f8fafc',
                px: 2, py: 1.5,
                borderBottom: '1px solid #e2e8f0',
              }}>
                {['Universal Category', 'Weight', 'Description'].map((h) => (
                  <Typography key={h} fontWeight={700} fontSize={13.5} color="#0f172a">{h}</Typography>
                ))}
              </Box>

              {/* Desktop rows */}
              {scoringTable.map((row, i) => (
                <Box key={i}>
                  {/* Desktop layout */}
                  <Box sx={{
                    display: { xs: 'none', sm: 'grid' },
                    gridTemplateColumns: '2fr 1fr 4fr',
                    px: 2, py: 1.5,
                    alignItems: 'start',
                  }}>
                    <Typography fontSize={13.5} color="#334155">{row.emoji} {row.category}</Typography>
                    <Typography fontSize={13.5} color="#334155" fontWeight={600}>{row.weight}</Typography>
                    <Typography fontSize={13.5} color="#334155">{row.description}</Typography>
                  </Box>

                  {/* Mobile layout — stacked card */}
                  <Box sx={{
                    display: { xs: 'flex', sm: 'none' },
                    flexDirection: 'column',
                    gap: 0.5,
                    px: 2, py: 1.5,
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography fontSize={13} color="#334155" fontWeight={700}>
                        {row.emoji} {row.category}
                      </Typography>
                      <Box sx={{
                        background: '#eff6ff', border: '1px solid #bfdbfe',
                        borderRadius: 5, px: 1.2, py: 0.2,
                      }}>
                        <Typography fontSize={12} color="#2563eb" fontWeight={700}>{row.weight}</Typography>
                      </Box>
                    </Box>
                    <Typography fontSize={12.5} color="#64748b" lineHeight={1.6}>{row.description}</Typography>
                  </Box>

                  {i < scoringTable.length - 1 && (
                    <Divider sx={{ borderColor: '#f1f5f9' }} />
                  )}
                </Box>
              ))}
            </Box>
          )}

          {idx < guidelines.length - 1 && (
            <Divider sx={{ my: 2.5, borderColor: '#f1f5f9' }} />
          )}
        </Box>
      ))}
    </Box>
  );
}