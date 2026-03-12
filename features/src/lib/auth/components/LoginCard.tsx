import { Box } from '@mui/material';
import { LoginForm } from './LoginForm';
import { LoginButton } from './LoginButton';
import { useLogin } from '../hooks/useLogin';

export function LoginCard() {
  const { values, errors, loading, handleChange, handleSubmit } = useLogin();

  return (
    <Box sx={{
      // Desktop: absolutely positioned on right
      // Tablet/Mobile: normal flow, centered
      position: { xs: 'relative', md: 'absolute' },
      right: { md: '6%' },
      top: { md: '50%' },
      transform: { md: 'translateY(-50%)' },
      mx: { xs: 'auto', md: 0 },
      my: { xs: 2, md: 0 },
      zIndex: 2,
      width: { xs: '100%', sm: '420px', md: '420px' },
      maxWidth: { xs: '100%', sm: 420 },
    }}>
      {/* Card */}
      <Box
        component="form"
        id="login-form"
        onSubmit={handleSubmit}
        sx={{
          background: 'rgba(232, 237, 242, 0.82)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: 4,
          boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
          px: { xs: 3, sm: 5 },
          pt: 5,
          pb: 10,
          overflow: 'visible',
        }}
      >
        <LoginForm
          values={values}
          errors={errors}
          handleChange={handleChange}
        />
      </Box>

      {/* Button overlays bottom of card */}
      <Box sx={{
        position: 'absolute',
        bottom: 32,
        left: { xs: -10, sm: -24 },
        right: { xs: -10, sm: -24 },
      }}>
        <LoginButton loading={loading} formId="login-form" />
      </Box>
    </Box>
  );
}