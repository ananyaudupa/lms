import { Box } from '@mui/material';
import { LoginForm } from './LoginForm';
import { LoginButton } from './LoginButton';
import { useLogin } from '../hooks/useLogin';

export function LoginCard() {
  const { values, errors, loading, handleChange, handleSubmit } = useLogin();

  return (
    <Box
      sx={{
        position: 'absolute',
        right: '14%',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        width: { xs: '90%', md: 420 },
      }}
    >
      {/* Card */}
      <Box
        sx={{
          background: 'rgba(232, 237, 242, 0.82)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: 4,
          boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
          px: 5,
          pt: 5,
          pb: 10,
          overflow:'visible',
        }}
      >
        <LoginForm
          onSubmit={handleSubmit}
          values={values}
          errors={errors}
          handleChange={handleChange}
        />
      </Box>

      {/* Button overlays bottom of card */}
      <Box sx={{ position: 'absolute', bottom: 32, left: -24, right: -24 }}>
        <LoginButton loading={loading} />
      </Box>
    </Box>
  );
}