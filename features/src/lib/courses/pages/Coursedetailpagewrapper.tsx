import { courseStore } from '../context/CourseContext';
import { CourseDetailPage } from './CourseDetailPage';

export function CourseDetailPageWrapper() {
  const course = courseStore.get();

  if (!course) {
    window.location.href = '/courses';
    return null;
  }

  return (
    <CourseDetailPage
      course={course}
      onBack={() => window.history.back()}
    />
  );
}