import { LoginBackground } from '../components/LoginBackground';
import { LoginLeftPanel } from '../components/LoginLeftPanel';
import { LoginCard } from '../components/LoginCard';

type Props = { studentsImage?: string };

export function LoginPage({ studentsImage }: Props) {
  return (
    <LoginBackground>
      <LoginLeftPanel studentsImage={studentsImage} />
      <LoginCard />
    </LoginBackground>
  );
}