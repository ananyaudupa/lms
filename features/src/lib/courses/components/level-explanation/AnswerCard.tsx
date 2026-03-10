import { Box, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CloseIcon from '@mui/icons-material/Close';
import type { AnswerOption } from '../../data/explanation.data';

type Props = {
  option: AnswerOption;
};

export function AnswerCard({ option }: Props) {
  const isCorrect   = option.isCorrect;
  const isWrongPick = option.isUserAnswer && !option.isCorrect;
  const isNeutral   = !option.isCorrect && !option.isUserAnswer;

  const borderColor = isCorrect ? '#22c55e' : isWrongPick ? '#ef4444' : '#e2e8f0';
  const bgColor     = isCorrect ? '#f0fdf4' : isWrongPick ? '#fff5f5' : '#fafafa';
  const textColor   = isCorrect ? '#15803d' : isWrongPick ? '#dc2626' : '#64748b';
  const exColor     = isCorrect ? '#16a34a' : isWrongPick ? '#dc2626' : '#64748b';

  return (
    <Box sx={{
      border: `1.5px solid ${borderColor}`,
      borderRadius: 2.5,
      p: 2,
      mb: 1.5,
      background: bgColor,
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        {isCorrect   && <CheckCircleOutlineIcon sx={{ color: '#22c55e', fontSize: 20 }} />}
        {isWrongPick && <CancelOutlinedIcon     sx={{ color: '#ef4444', fontSize: 20 }} />}
        {isNeutral   && <CloseIcon              sx={{ color: '#94a3b8', fontSize: 16, ml: '2px' }} />}
        <Typography fontWeight={700} fontSize={15} color={textColor}>
          {option.letter}. {option.text}
        </Typography>
      </Box>
      <Typography fontSize={13} color={exColor} sx={{ pl: 3.5, lineHeight: 1.7 }}>
        <Box component="span" fontWeight={700}>Explanation: </Box>
        {option.explanation}
      </Typography>
    </Box>
  );
}