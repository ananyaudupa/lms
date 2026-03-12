export type CourseRow = {
  name: string;
  completion: number;
  level: number;
  avgMarks: number;
};

export type AssessmentRow = {
  title: string;
  attempts: number;
  bestScore: number;
  maxScore: number;
  progressRange: number;
  status: 'Passed' | 'Failed';
};

export const rollBasedCourses: CourseRow[] = [
  { name: 'Basics of Embedded Systems',  completion: 50,  level: 3, avgMarks: 40  },
  { name: 'Full Stack Development',       completion: 100, level: 5, avgMarks: 100 },
  { name: 'Performance Testing',          completion: 18,  level: 1, avgMarks: 40  },
  { name: 'Understanding RabbitMQ',       completion: 50,  level: 2, avgMarks: 65  },
  { name: 'System Design Architecture',  completion: 73,  level: 2, avgMarks: 85  },
];

export const upskillingCourses: CourseRow[] = [
  { name: 'Basics of Embedded Systems',  completion: 50,  level: 3, avgMarks: 40  },
  { name: 'Full Stack Development',       completion: 100, level: 5, avgMarks: 100 },
  { name: 'Performance Testing',          completion: 18,  level: 1, avgMarks: 40  },
  { name: 'Understanding RabbitMQ',       completion: 50,  level: 2, avgMarks: 65  },
  { name: 'System Design Architecture',  completion: 73,  level: 2, avgMarks: 85  },
];

export const masterAssessmentPerformance: AssessmentRow[] = [
  { title: 'Basics of Embedded Systems', attempts: 2, bestScore: 94,  maxScore: 100, progressRange: 94,  status: 'Passed' },
  { title: 'Full Stack Development',      attempts: 1, bestScore: 98,  maxScore: 100, progressRange: 98,  status: 'Passed' },
  { title: 'Performance Testing',         attempts: 3, bestScore: 65,  maxScore: 100, progressRange: 65,  status: 'Failed' },
  { title: 'Understanding RabbitMQ',      attempts: 1, bestScore: 92,  maxScore: 100, progressRange: 92,  status: 'Passed' },
  { title: 'System Design Architecture', attempts: 2, bestScore: 78,  maxScore: 100, progressRange: 78,  status: 'Passed' },
];