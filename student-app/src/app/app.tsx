// import { RoadmapPage } from '@org/features';

// export default function App() {
//   return <RoadmapPage isEditable={false} />;
// }
import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import studentsImage from '../assets/students.svg';

const LoginPage           = lazy(() => import('@org/features').then(m => ({ default: m.LoginPage })));
const DashboardPage       = lazy(() => import('@org/features').then(m => ({ default: m.DashboardPage })));
const CoursesPage         = lazy(() => import('@org/features').then(m => ({ default: m.CoursesPage })));
const CourseDetailWrapper = lazy(() => import('@org/features').then(m => ({ default: m.CourseDetailPageWrapper })));
const AssessmentsListPage = lazy(() => import('@org/features').then(m => ({ default: m.AssessmentsListPage })));
const MyPerformancePage = lazy(() => import('@org/features').then(m => ({ default: m.MyPerformancePage })));
export default function App() {
  return (
    <Routes>
      <Route path="/login"         element={<LoginPage studentsImage={studentsImage} />} />
      <Route path="/dashboard"     element={<DashboardPage />} />
      <Route path="/courses"       element={<CoursesPage />} />
      <Route path="/course-detail" element={<CourseDetailWrapper />} />
      <Route path="/assessments"   element={<AssessmentsListPage />} />
      <Route path="*"              element={<Navigate to="/login" replace />} />
      <Route path="/performance" element={<MyPerformancePage />} />
    </Routes>
  );
}