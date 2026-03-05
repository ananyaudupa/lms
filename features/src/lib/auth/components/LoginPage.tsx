import { LoginBackground } from './LoginBackground';
import { LoginLeftPanel } from './LoginLeftPanel';
import { LoginCard } from './LoginCard';

type Props = {
  studentsImage?: string;
};

export function LoginPage({ studentsImage }: Props) {
  return (
    <LoginBackground>
      <LoginLeftPanel studentsImage={studentsImage} />
      <LoginCard />
    </LoginBackground>
  );
}