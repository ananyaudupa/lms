// import { RoadmapPage } from '@org/features';

// export default function App() {
//   return <RoadmapPage isEditable={false} />;
// }
import { Routes, Route, Navigate } from 'react-router-dom';
import studentsImage from '../assets/students.svg';
import { LoginPage, DashboardPage, CoursesPage } from '@org/features';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage studentsImage={studentsImage} />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}