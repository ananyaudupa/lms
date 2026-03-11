export type Assessment = {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  createdDate: string;
  attemptsUsed: number;
  totalAttempts: number;
  hasAttempted: boolean;
};

export type GuidelineSection = {
  emoji: string;
  title: string;
  content: string | string[];
};

export type ScoringRow = {
  emoji: string;
  category: string;
  weight: string;
  description: string;
};

export type AssessmentDetail = Assessment & {
  guidelines: GuidelineSection[];
  scoringTable: ScoringRow[];
};

export const assessments: Assessment[] = [
  {
    id: 'dlms',
    title: 'DLMS Master Assessment',
    description: 'Master SQL to efficiently manage, query, and analyze data across relational databases.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=220&fit=crop',
    duration: '60 Min',
    createdDate: '03/02/2026',
    attemptsUsed: 1,
    totalAttempts: 3,
    hasAttempted: true,
  },
  {
    id: 'cs',
    title: 'Computer Science',
    description: 'Master core computing principles—from algorithms to systems—to solve complex problems and build efficient software.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=220&fit=crop',
    duration: '60 Min',
    createdDate: '03/02/2026',
    attemptsUsed: 0,
    totalAttempts: 3,
    hasAttempted: false,
  },
  {
    id: 'react',
    title: 'React',
    description: 'Build dynamic, component-based user interfaces with React for fast, scalable, and modern web applications.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=220&fit=crop',
    duration: '60 Min',
    createdDate: '03/02/2026',
    attemptsUsed: 0,
    totalAttempts: 3,
    hasAttempted: false,
  },
  {
    id: 'vue',
    title: 'Vue.js',
    description: 'Build progressive, reactive web applications with Vue.js using its intuitive component system.',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=220&fit=crop',
    duration: '45 Min',
    createdDate: '03/02/2026',
    attemptsUsed: 0,
    totalAttempts: 3,
    hasAttempted: false,
  },
  {
    id: 'angular',
    title: 'Angular',
    description: 'Master Angular framework to build enterprise-grade, scalable, and maintainable web applications.',
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=220&fit=crop',
    duration: '60 Min',
    createdDate: '03/02/2026',
    attemptsUsed: 5,
    totalAttempts: 5,
    hasAttempted: true,
  },
  {
    id: 'js',
    title: 'JavaScript',
    description: 'Deep-dive into JavaScript fundamentals and advanced patterns for modern web development.',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=220&fit=crop',
    duration: '50 Min',
    createdDate: '03/02/2026',
    attemptsUsed: 0,
    totalAttempts: 3,
    hasAttempted: false,
  },
];

export const assessmentDetails: Record<string, AssessmentDetail> = {
  dlms: {
    ...assessments[0],
    guidelines: [
      {
        emoji: '🚀',
        title: 'Test Introduction',
        content: [
          'Welcome to the DLMS/COSEM Skills Assessment for Smart Energy Data Management!',
          '💡 This quiz will challenge you to write effective C# code in a real-world scenario. You\'ll work with raw data from smart meters, parse communication frames, and decode COSEM objects, solving practical problems that mirror the daily tasks of developing firmware and head-end systems for a modern, data-driven utility company.',
        ],
      },
      {
        emoji: '📝',
        title: 'Test Summary',
        content: 'To excel in this assessment, you\'ll need a solid grasp of core C# programming and DLMS/COSEM principles. This includes parsing raw byte streams (like HDLC and TCP/IP Wrapper frames), decoding COSEM objects and their attributes, understanding the DLMS application layer (AARQ/AARE handshakes, GET/SET requests), implementing data security concepts, and building reusable solutions for data transformation.',
      },
      {
        emoji: '⭐',
        title: 'Important Instructions & How You\'re Scored ⭐',
        content: 'Before you begin, please read these instructions carefully. Your final score is calculated based on more than just getting the right answer.',
      },
      {
        emoji: '⏰',
        title: 'Time Limit',
        content: [
          '60-Minute Duration: The test is timed. You will have exactly 60 minutes to complete all questions.',
          'Automatic Submission: The test will automatically submit when the timer runs out, so please manage your time wisely!',
        ],
      },
      {
        emoji: '⚠️',
        title: 'Academic Integrity',
        content: [
          'No Copy/Paste: All code must be typed by you. Copying and pasting is disabled.',
          'Single Window Focus: You must remain in the test window. Navigating away will flag your test.',
          'No AI Assistance: Use of AI tools or external help is strictly prohibited and will result in disqualification.',
        ],
      },
      {
        emoji: '🏆',
        title: 'Scoring Framework',
        content: 'Your performance is evaluated against a professional standard based on the ISO/IEC 25010 software quality model. This ensures a fair and comprehensive assessment of your skills.',
      },
    ],
    scoringTable: [
      { emoji: '✅', category: 'Correctness & Reliability', weight: '60%', description: 'Does your code produce the exact, correct output for all test cases?' },
      { emoji: '🤝', category: 'Maintainability & Quality', weight: '25%', description: 'Is your code clean, readable, well-structured, and follow idiomatic C# conventions? Is it easy to maintain?' },
      { emoji: '⚡', category: 'Efficiency & Best Practices', weight: '15%', description: 'Does your code use efficient byte manipulation and follow DLMS/COSEM and C# best practices?' },
    ],
  },
};

export function getAssessmentDetail(id: string): AssessmentDetail | null {
  return assessmentDetails[id] ?? null;
}