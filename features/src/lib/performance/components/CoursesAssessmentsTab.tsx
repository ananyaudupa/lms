import { CoursePerformanceTable } from './CoursePerformanceTable';
import { MasterAssessmentPerformanceTable } from './MasterAssessmentPerformanceTable';
import {
  rollBasedCourses,
  upskillingCourses,
  masterAssessmentPerformance,
} from '../data/coursesAssessments.data';

export function CoursesAssessmentsTab() {
  return (
    <>
      <CoursePerformanceTable
        title="Roll Based Course Performance"
        subtitle="Roll based learning progress and completion rates"
        rows={rollBasedCourses}
      />

      <CoursePerformanceTable
        title="Upskilling Course Performance"
        subtitle="Self-paced learning progress and completion rates"
        rows={upskillingCourses}
      />

      <MasterAssessmentPerformanceTable rows={masterAssessmentPerformance} />
    </>
  );
}