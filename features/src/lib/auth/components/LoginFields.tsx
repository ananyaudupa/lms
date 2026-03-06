import { Box, TextField, Typography, InputAdornment } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

type Props = {
  emailValue: string;
  emailError?: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordValue: string;
  passwordError?: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 3,
    background: '#ffffff',
    '& fieldset': { borderColor: '#cbd5e1' },
    '&:hover fieldset': { borderColor: '#4f46e5' },
    '&.Mui-focused fieldset': { borderColor: '#4f46e5' },
  },
};

export function LoginFields({
  emailValue, emailError, onEmailChange,
  passwordValue, passwordError, onPasswordChange,
}: Props) {
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Typography sx={{ fontWeight: 600, fontSize: 14, mb: 0.5, color: '#1a1a2e' }}>
          Email Id
        </Typography>
        <TextField
          fullWidth
          placeholder="you@example.com"
          value={emailValue}
          onChange={onEmailChange}
          error={!!emailError}
          helperText={emailError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
          sx={fieldSx}
        />
      </Box>

      <Box sx={{ width: '100%' }}>
        <Typography sx={{ fontWeight: 600, fontSize: 14, mb: 0.5, color: '#1a1a2e' }}>
          Password
        </Typography>
        <TextField
          fullWidth
          type="password"
          placeholder="Enter Your Password"
          value={passwordValue}
          onChange={onPasswordChange}
          error={!!passwordError}
          helperText={passwordError}
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
    </>
  );
}