import { Box, Typography } from '@mui/material';
import { tokens } from '@org/shared';
import { AttemptRow } from './AttemptRow';
import type { AttemptLog } from '../../data/explanation.data';

type Props = {
  attempts: AttemptLog[];
};

export function AttemptsLog({ attempts }: Props) {
  return (
    <Box>
      <Typography variant="h5" fontWeight={900} color={tokens.primary} sx={{ mb: 2 }}>
        Attempts Log
      </Typography>
      {attempts.map((attempt) => (
        <AttemptRow key={attempt.attemptNumber} attempt={attempt} />
      ))}
    </Box>
  );
}