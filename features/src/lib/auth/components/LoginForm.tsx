import { Box, Typography } from '@mui/material';
import { useLogin } from '../hooks/useLogin';
import { LoginLogo } from './LoginLogo';
import { LoginEmailField } from './LoginEmailField';
import { LoginPasswordField } from './LoginPasswordField';
import { LoginActions } from './LoginActions';

type Props = {
  onSubmit: (e: React.FormEvent) => void;
  values: ReturnType<typeof useLogin>['values'];
  errors: ReturnType<typeof useLogin>['errors'];
  handleChange: ReturnType<typeof useLogin>['handleChange'];
};

export function LoginForm({ onSubmit, values, errors, handleChange }: Props) {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2.5, pb: 3 }}
    >
      <LoginLogo />
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a2e', textAlign: 'center', lineHeight: 1.3 }}>
        Log In to Continue your<br />Learning Journey
      </Typography>
      <LoginEmailField value={values.email} error={errors.email} onChange={handleChange('email')} />
      <LoginPasswordField value={values.password} error={errors.password} onChange={handleChange('password')} />
      <LoginActions rememberMe={values.rememberMe} onChange={handleChange('rememberMe')} />
    </Box>
  );
}