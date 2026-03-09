import { Button } from '@mui/material';
import { ReactNode } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { tokens } from '@org/shared';

type Status = 'finished' | 'continue' | 'start';
type Props = { status: Status };

const config: Record<Status, { label: string; icon: ReactNode }> = {
  finished: { label: 'Course Finished', icon: <CheckCircleIcon /> },
  continue: { label: 'Continue Learning', icon: <PlayArrowIcon /> },
  start:    { label: 'Start Learning',   icon: <PlayArrowIcon /> },
};

export function CourseActionButton({ status }: Props) {
  const { label, icon } = config[status];
  return (
    <Button variant="contained" endIcon={icon}
      sx={{
        background: tokens.btnPrimary,
        textTransform: 'none', fontWeight: 700, borderRadius: 2,
        whiteSpace: 'nowrap', minWidth: 200,
        '&:hover': { background: tokens.btnPrimaryHover },
      }}
    >
      {label}
    </Button>
  );
}