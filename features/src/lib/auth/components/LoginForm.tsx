import {
  Box, TextField, Button, Checkbox,
  FormControlLabel, Typography, Link,
  InputAdornment, CircularProgress,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useLogin } from '../hooks/useLogin';

// Placeholder logo — replace with <img src={synterraLogo} /> tomorrow
function SynterraLogo() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={1}>
      <Box
        sx={{
          width: 56, height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          mb: 1,
          boxShadow: '0 4px 16px rgba(79,70,229,0.4)',
        }}
      >
        <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: 22 }}>S</Typography>
      </Box>
      <Typography sx={{ fontWeight: 800, fontSize: 22, color: '#1a1a2e', letterSpacing: 0.5 }}>
        Synterra
      </Typography>
    </Box>
  );
}

export function LoginForm() {
  const { values, errors, loading, handleChange, handleSubmit } = useLogin();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2.5,
      }}
    >
      <SynterraLogo />

      <Typography
        variant="h5"
        sx={{ fontWeight: 700, color: '#1a1a2e', textAlign: 'center', lineHeight: 1.3 }}
      >
        Log In to Continue your<br />Learning Journey
      </Typography>

      {/* Email */}
      <Box sx={{ width: '100%' }}>
        <Typography sx={{ fontWeight: 600, fontSize: 14, mb: 0.5, color: '#1a1a2e' }}>
          Email Id
        </Typography>
        <TextField
          fullWidth
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange('email')}
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              background: '#f8fafc',
              '& fieldset': { borderColor: '#e2e8f0' },
              '&:hover fieldset': { borderColor: '#4f46e5' },
              '&.Mui-focused fieldset': { borderColor: '#4f46e5' },
            },
          }}
        />
      </Box>

      {/* Password */}
      <Box sx={{ width: '100%' }}>
        <Typography sx={{ fontWeight: 600, fontSize: 14, mb: 0.5, color: '#1a1a2e' }}>
          Password
        </Typography>
        <TextField
          fullWidth
          type="password"
          placeholder="Enter Your Password"
          value={values.password}
          onChange={handleChange('password')}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              background: '#f8fafc',
              '& fieldset': { borderColor: '#e2e8f0' },
              '&:hover fieldset': { borderColor: '#4f46e5' },
              '&.Mui-focused fieldset': { borderColor: '#4f46e5' },
            },
          }}
        />
      </Box>

      {/* Remember me + Forgot password */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={values.rememberMe}
              onChange={handleChange('rememberMe')}
              size="small"
              sx={{ color: '#94a3b8', '&.Mui-checked': { color: '#4f46e5' } }}
            />
          }
          label={
            <Typography sx={{ fontSize: 13, color: '#475569' }}>Remember Me</Typography>
          }
        />
        <Link
          href="#"
          underline="always"
          sx={{ fontSize: 13, color: '#1a1a2e', fontWeight: 600 }}
        >
          Forgot Password?
        </Link>
      </Box>

      {/* Submit */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{
          py: 1.8,
          borderRadius: 2,
          background: 'linear-gradient(90deg, #2563eb, #06b6d4)',
          fontWeight: 700,
          fontSize: 16,
          textTransform: 'none',
          boxShadow: '0 4px 16px rgba(37,99,235,0.4)',
          '&:hover': {
            background: 'linear-gradient(90deg, #1d4ed8, #0891b2)',
            boxShadow: '0 6px 20px rgba(37,99,235,0.5)',
          },
          '&.Mui-disabled': { background: '#e2e8f0' },
        }}
      >
        {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Log In'}
      </Button>
    </Box>
  );
}