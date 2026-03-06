// import { RoadmapPage } from '@org/features';

// export default function App() {
//   return <RoadmapPage isEditable={false} />;
// }
import studentsImage from '../assets/students.svg';
import { LoginPage } from '@org/features';

export default function App() {
  return <LoginPage studentsImage={studentsImage} />;
}