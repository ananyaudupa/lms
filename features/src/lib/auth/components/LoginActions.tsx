import { Box, Checkbox, FormControlLabel, Link, Typography } from '@mui/material';

type Props = {
  rememberMe: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function LoginActions({ rememberMe, onChange }: Props) {
  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={rememberMe}
            onChange={onChange}
            size="small"
            sx={{ color: '#94a3b8', '&.Mui-checked': { color: '#4f46e5' } }}
          />
        }
        label={<Typography sx={{ fontSize: 13, color: '#475569' }}>Remember Me</Typography>}
      />
      <Link href="#" underline="always" sx={{ fontSize: 13, color: '#1a1a2e', fontWeight: 600 }}>
        Forgot Password?
      </Link>
    </Box>
  );
}