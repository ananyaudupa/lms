import { LoginBackground } from './LoginBackground';
import { LoginLeftPanel } from './LoginLeftPanel';
import { LoginCard } from './LoginCard';

export function LoginPage() {
  return (
    <LoginBackground>
      <LoginLeftPanel />
      <LoginCard />
    </LoginBackground>
  );
}