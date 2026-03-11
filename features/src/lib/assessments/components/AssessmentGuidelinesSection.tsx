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
      p: 3,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    }}>
      <Typography fontWeight={900} fontSize={24} color="#1e40af" mb={3}>
        Assessment Guidelines
      </Typography>

      {guidelines.map((section, idx) => (
        <Box key={idx}>
          {/* Section heading */}
          <Typography fontWeight={800} fontSize={17} color="#0f172a" mb={1} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {section.emoji} {section.title}
          </Typography>

          {/* Section content */}
          {Array.isArray(section.content) ? (
            section.content.map((line, i) => (
              <Typography key={i} fontSize={14.5} color="#334155" lineHeight={1.75} mb={0.8}>
                {line}
              </Typography>
            ))
          ) : (
            <Typography fontSize={14.5} color="#334155" lineHeight={1.75} mb={0.8}>
              {section.content}
            </Typography>
          )}

          {/* Scoring table after the scoring framework section */}
          {section.title.includes('Scoring') && (
            <Box sx={{
              mt: 2, mb: 1,
              border: '1px solid #e2e8f0',
              borderRadius: 2,
              overflow: 'hidden',
            }}>
              {/* Table header */}
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 4fr',
                background: '#f8fafc',
                px: 2, py: 1.5,
                borderBottom: '1px solid #e2e8f0',
              }}>
                {['Universal Category', 'Weight', 'Description'].map((h) => (
                  <Typography key={h} fontWeight={700} fontSize={13.5} color="#0f172a">{h}</Typography>
                ))}
              </Box>

              {/* Table rows */}
              {scoringTable.map((row, i) => (
                <Box key={i}>
                  <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 4fr',
                    px: 2, py: 1.5,
                    alignItems: 'start',
                  }}>
                    <Typography fontSize={13.5} color="#334155">
                      {row.emoji} {row.category}
                    </Typography>
                    <Typography fontSize={13.5} color="#334155" fontWeight={600}>
                      {row.weight}
                    </Typography>
                    <Typography fontSize={13.5} color="#334155">
                      {row.description}
                    </Typography>
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