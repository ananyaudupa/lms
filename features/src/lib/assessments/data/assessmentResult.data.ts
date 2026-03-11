export type QuestionScore = {
  id: number;
  label: string;
  score: number;
  maxScore: number;
};

export type AttemptResult = {
  attemptNumber: number;
  date: string | null;
  time: string | null;
  totalScore: number;
  maxScore: number;
  questionsCount: number;
  correctness: number;
  efficiency: number;
  codeQuality: number;
  questions: QuestionScore[];
};

export type AssessmentResult = {
  assessmentId: string;
  title: string;
  attempts: AttemptResult[];
};

export const assessmentResults: Record<string, AssessmentResult> = {
  dlms: {
    assessmentId: 'dlms',
    title: 'DLMS Master Assessment',
    attempts: [
      {
        attemptNumber: 1,
        date: 'Mar 03, 2026',
        time: '02:30 PM',
        totalScore: 53.7,
        maxScore: 100,
        questionsCount: 10,
        correctness: 48,
        efficiency: 45,
        codeQuality: 51,
        questions: [
          { id: 1, label: 'Question 1', score: 1.4,  maxScore: 10 },
          { id: 2, label: 'Question 2', score: 9.9,  maxScore: 10 },
          { id: 3, label: 'Question 3', score: 6.2,  maxScore: 10 },
          { id: 4, label: 'Question 4', score: 9.9,  maxScore: 10 },
          { id: 5, label: 'Question 5', score: 2.3,  maxScore: 10 },
          { id: 6, label: 'Question 6', score: 7.5,  maxScore: 10 },
          { id: 7, label: 'Question 7', score: 4.8,  maxScore: 10 },
          { id: 8, label: 'Question 8', score: 8.1,  maxScore: 10 },
          { id: 9, label: 'Question 9', score: 3.6,  maxScore: 10 },
          { id: 10,label: 'Question 10',score: 0.0,  maxScore: 10 },
        ],
      },
      {
        attemptNumber: 2,
        date: null, time: null,
        totalScore: 0, maxScore: 100, questionsCount: 10,
        correctness: 0, efficiency: 0, codeQuality: 0,
        questions: [],
      },
      {
        attemptNumber: 3,
        date: null, time: null,
        totalScore: 0, maxScore: 100, questionsCount: 10,
        correctness: 0, efficiency: 0, codeQuality: 0,
        questions: [],
      },
    ],
  },
};

export function getAssessmentResult(id: string): AssessmentResult | null {
  return assessmentResults[id] ?? null;
}