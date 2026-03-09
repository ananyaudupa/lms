import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  label: string;
  value: string;
  sub: string;
  subIcon: ReactNode;
  icon: ReactNode;
  bg: string;
};

export function StatCard({ label, value, sub, subIcon, icon, bg }: Props) {
  return (
    <Box
      sx={{
        background: bg,
        borderRadius: 3,
        p: 2.5,
        position: 'relative',
        overflow: 'hidden',
        color: '#fff',
        minHeight: 130,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Decorative circles */}
      <Box sx={{ position: 'absolute', right: -25, top: -25, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
      <Box sx={{ position: 'absolute', right: 18, top: 18, width: 65, height: 65, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
      <Box sx={{ position: 'absolute', left: -25, bottom: -25, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />

      {/* Top row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
        <Box sx={{ background: 'rgba(255,255,255,0.2)', borderRadius: 2, p: 0.8 }}>{icon}</Box>
        <Typography sx={{ fontSize: 40, fontWeight: 800, lineHeight: 1 }}>{value}</Typography>
      </Box>

      {/* Bottom */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 0.5 }}>{label}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, opacity: 0.85 }}>
          {subIcon}
          <Typography sx={{ fontSize: 12 }}>{sub}</Typography>
        </Box>
      </Box>
    </Box>
  );
}