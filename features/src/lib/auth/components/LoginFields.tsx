import { useState } from 'react';
import { Box, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

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
  const [showPassword, setShowPassword] = useState(false);

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
          type={showPassword ? 'text' : 'password'}
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
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(p => !p)} edge="end" size="small">
                  {showPassword
                    ? <VisibilityOutlinedIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                    : <VisibilityOffOutlinedIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                  }
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={fieldSx}
        />
      </Box>
    </>
  );
}