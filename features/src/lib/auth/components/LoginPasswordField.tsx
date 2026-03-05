import { Box, TextField, Typography, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
type Props = {
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    background: '#f8fafc',
    '& fieldset': { borderColor: '#e2e8f0' },
    '&:hover fieldset': { borderColor: '#4f46e5' },
    '&.Mui-focused fieldset': { borderColor: '#4f46e5' },
  },
};

export function LoginPasswordField({ value, error, onChange }: Props) {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography sx={{ fontWeight: 600, fontSize: 14, mb: 0.5, color: '#1a1a2e' }}>
        Password
      </Typography>
      <TextField
        fullWidth
        type="password"
        placeholder="Enter Your Password"
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={error}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
               <LockOutlinedIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
            </InputAdornment>
          ),
        }}
        sx={fieldSx}
      />
    </Box>
  );
}