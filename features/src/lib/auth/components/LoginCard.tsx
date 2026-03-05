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
        right: '22%',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        width: { xs: '90%', md: 420 },
        background: '#e8edf2',
        borderRadius: 4,
        boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Form content with padding */}
      <Box sx={{ px: 5, pt: 5 }}>
        <LoginForm
          onSubmit={handleSubmit}
          values={values}
          errors={errors}
          handleChange={handleChange}
        />
      </Box>

      {/* Button — completely outside padding, flush to card edges */}
      <LoginButton loading={loading} />
    </Box>
  );
}