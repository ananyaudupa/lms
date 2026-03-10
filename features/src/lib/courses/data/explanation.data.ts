// features/src/lib/courses/data/explanation.data.ts

export type AnswerOption = {
  letter: string;
  text: string;
  explanation: string;
  isCorrect: boolean;
  isUserAnswer: boolean; // true = what the user actually picked
};

export type QuestionResult = {
  id: number;
  category: string;
  question: string;
  options: AnswerOption[];
};

export type AttemptLog = {
  attemptNumber: number;
  date: string | null;
  time: string | null;
  correct: number | null;
  incorrect: number | null;
  timeTaken: string | null;
  questions: QuestionResult[];
};

export type LevelExplanationData = {
  level: number;
  passingScore: number;
  userScore: number;
  passed: boolean;
  attemptsTaken: number;
  timeAllocated: string;
  startedDate: string;
  startedTime: string;
  completedDate: string;
  completedTime: string;
  attempts: AttemptLog[];
};

// ─────────────────────────────────────────────────────────────────────────────
// Helper: build an option. isUserAnswer defaults false; pass true for the
// option the user actually selected.
// ─────────────────────────────────────────────────────────────────────────────
function opt(
  letter: string,
  text: string,
  explanation: string,
  isCorrect: boolean,
  isUserAnswer = false
): AnswerOption {
  return { letter, text, explanation, isCorrect, isUserAnswer };
}

// ─────────────────────────────────────────────────────────────────────────────
// Level 1 — user passed (60 %). Questions 1–3 correct, Q4–Q5 wrong.
// ─────────────────────────────────────────────────────────────────────────────
const level1Questions: QuestionResult[] = [
  {
    id: 1,
    category: 'Core Purpose and Advantages of the .NET Platform',
    question:
      'A team wants to write business logic in C# and a data analysis module in F#. Which core feature of .NET makes this integration seamless?',
    options: [
      opt('A', 'Base Class Library (BCL)',
        'Correct. The BCL is the foundational library shared across all .NET languages, enabling seamless interoperability between C# and F# code.',
        true, true),   // ✅ user picked correct
      opt('B', 'Intermediate Language (IL)',
        'Incorrect. IL is the compiled output of .NET code, not the library that enables language interoperability.',
        false),
      opt('C', 'Common Language Runtime (CLR)',
        'Incorrect. The CLR executes code but is not the library that provides shared types across languages.',
        false),
      opt('D', 'Visual Studio IDE',
        'Incorrect. Visual Studio is a development tool, not a runtime or framework feature.',
        false),
    ],
  },
  {
    id: 2,
    category: 'Core Purpose and Advantages of the .NET Platform',
    question:
      'What is the name of the extensive set of pre-written classes and functions in .NET used for common tasks like file I/O and networking?',
    options: [
      opt('A', 'Base Class Library (BCL)',
        'Correct. The BCL ships with .NET and provides ready-to-use APIs for file I/O, networking, collections, and much more.',
        true, true),   // ✅ user picked correct
      opt('B', 'Intermediate Language (IL)',
        'Incorrect. IL is the bytecode format .NET compiles to, not a set of APIs.',
        false),
      opt('C', 'Common Language Runtime (CLR)',
        'Incorrect. The CLR is the execution engine, not the class library.',
        false),
      opt('D', 'Visual Studio IDE',
        'Incorrect. Visual Studio is an IDE, not part of the .NET runtime stack.',
        false),
    ],
  },
  {
    id: 3,
    category: 'Core Purpose and Advantages of the .NET Platform',
    question:
      'Which .NET component is responsible for memory management and garbage collection at runtime?',
    options: [
      opt('A', 'Base Class Library (BCL)',
        'Incorrect. The BCL provides APIs, but memory management is handled by the runtime.',
        false),
      opt('B', 'Common Language Runtime (CLR)',
        'Correct. The CLR manages memory, performs garbage collection, handles exceptions, and provides type safety.',
        true, true),   // ✅ user picked correct
      opt('C', 'NuGet Package Manager',
        'Incorrect. NuGet manages third-party library dependencies, not runtime memory.',
        false),
      opt('D', 'MSBuild',
        'Incorrect. MSBuild is the build system for .NET projects.',
        false),
    ],
  },
  {
    id: 4,
    category: 'Core Purpose and Advantages of the .NET Platform',
    question:
      'What does the term "cross-platform" mean in the context of .NET Core?',
    options: [
      opt('A', 'Code can only run on Windows servers',
        'Incorrect. This is the opposite of cross-platform.',
        false),
      opt('B', 'Applications can run on Windows, macOS, and Linux',
        'Correct. .NET Core was designed from the ground up to run on Windows, macOS, and Linux.',
        true),         // ✅ correct but user did NOT pick this
      opt('C', 'Code is automatically translated to JavaScript',
        'Incorrect. .NET code compiles to IL, not JavaScript (unless using Blazor WebAssembly).',
        false),
      opt('D', 'Applications require Mono to run on non-Windows systems',
        'Incorrect. .NET Core runs natively on non-Windows systems without Mono.',
        false, true),  // ❌ user picked wrong answer
    ],
  },
  {
    id: 5,
    category: 'Core Purpose and Advantages of the .NET Platform',
    question:
      'Which file extension is used for compiled .NET assemblies?',
    options: [
      opt('A', '.exe or .dll',
        'Correct. .NET assemblies are compiled to either executable (.exe) or library (.dll) files.',
        true),         // ✅ correct but user did NOT pick this
      opt('B', '.class',
        'Incorrect. .class is a Java bytecode format, not .NET.',
        false),
      opt('C', '.jar',
        'Incorrect. .jar is a Java archive format.',
        false, true),  // ❌ user picked wrong answer
      opt('D', '.wasm',
        'Incorrect. .wasm is WebAssembly, a separate technology.',
        false),
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Level 2 — user failed (0 %). All 5 answers wrong.
// ─────────────────────────────────────────────────────────────────────────────
const level2Questions: QuestionResult[] = [
  {
    id: 1,
    category: 'HTML & CSS Fundamentals',
    question: 'Which HTML tag is used to define the largest heading?',
    options: [
      opt('A', '<h1>',
        'Correct. <h1> defines the most important (largest) heading in HTML.',
        true),
      opt('B', '<h6>',
        'Incorrect. <h6> is the smallest heading, not the largest.',
        false, true),  // ❌ user picked wrong
      opt('C', '<header>',
        'Incorrect. <header> is a semantic section element, not a heading size tag.',
        false),
      opt('D', '<title>',
        'Incorrect. <title> defines the browser tab title, not a visible heading.',
        false),
    ],
  },
  {
    id: 2,
    category: 'HTML & CSS Fundamentals',
    question: 'What does CSS stand for?',
    options: [
      opt('A', 'Cascading Style Sheets',
        'Correct. CSS stands for Cascading Style Sheets, the language used to style HTML documents.',
        true),
      opt('B', 'Computer Style Syntax',
        'Incorrect. This is not what CSS stands for.',
        false, true),  // ❌ user picked wrong
      opt('C', 'Creative Styling System',
        'Incorrect. CSS is not an acronym for this phrase.',
        false),
      opt('D', 'Coded Stylesheet',
        'Incorrect. This is not the correct expansion of CSS.',
        false),
    ],
  },
  {
    id: 3,
    category: 'HTML & CSS Fundamentals',
    question: 'Which CSS property is used to change the text color of an element?',
    options: [
      opt('A', 'background-color',
        'Incorrect. background-color changes the background, not the text color.',
        false, true),  // ❌ user picked wrong
      opt('B', 'color',
        'Correct. The color property sets the foreground (text) color of an element.',
        true),
      opt('C', 'font-color',
        'Incorrect. font-color is not a valid CSS property.',
        false),
      opt('D', 'text-style',
        'Incorrect. text-style is not a valid CSS property.',
        false),
    ],
  },
  {
    id: 4,
    category: 'HTML & CSS Fundamentals',
    question: 'What is the correct HTML element for inserting a line break?',
    options: [
      opt('A', '<break>',
        'Incorrect. <break> is not a valid HTML tag.',
        false, true),  // ❌ user picked wrong
      opt('B', '<lb>',
        'Incorrect. <lb> is not a valid HTML tag.',
        false),
      opt('C', '<br>',
        'Correct. <br> is the self-closing tag used to insert a line break in HTML.',
        true),
      opt('D', '<newline>',
        'Incorrect. <newline> is not a valid HTML element.',
        false),
    ],
  },
  {
    id: 5,
    category: 'HTML & CSS Fundamentals',
    question: 'Which CSS display value makes an element a block-level flex container?',
    options: [
      opt('A', 'display: block',
        'Incorrect. display: block makes a block element but does not enable flexbox.',
        false, true),  // ❌ user picked wrong
      opt('B', 'display: inline',
        'Incorrect. display: inline makes an inline element, not a flex container.',
        false),
      opt('C', 'display: grid',
        'Incorrect. display: grid creates a grid container, not a flex container.',
        false),
      opt('D', 'display: flex',
        'Correct. display: flex turns an element into a block-level flex container, enabling flexbox layout for its children.',
        true),
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Exported map
// ─────────────────────────────────────────────────────────────────────────────
export const levelExplanations: Record<number, LevelExplanationData> = {
  1: {
    level: 1,
    passingScore: 50,
    userScore: 60,
    passed: true,
    attemptsTaken: 1,
    timeAllocated: '20:00',
    startedDate: 'Mar 03, 2026',
    startedTime: '02:15 PM',
    completedDate: 'Mar 03, 2026',
    completedTime: '02:30 PM',
    attempts: [
      {
        attemptNumber: 1,
        date: 'Mar 3, 2026',
        time: '02:15 PM',
        correct: 3,
        incorrect: 2,
        timeTaken: '15 m',
        questions: level1Questions,
      },
      { attemptNumber: 2, date: null, time: null, correct: null, incorrect: null, timeTaken: null, questions: [] },
      { attemptNumber: 3, date: null, time: null, correct: null, incorrect: null, timeTaken: null, questions: [] },
    ],
  },

  2: {
    level: 2,
    passingScore: 50,
    userScore: 0,
    passed: false,
    attemptsTaken: 1,
    timeAllocated: '20:00',
    startedDate: 'Mar 04, 2026',
    startedTime: '10:00 AM',
    completedDate: 'Mar 04, 2026',
    completedTime: '10:18 AM',
    attempts: [
      {
        attemptNumber: 1,
        date: 'Mar 4, 2026',
        time: '10:00 AM',
        correct: 0,
        incorrect: 5,
        timeTaken: '18 m',
        questions: level2Questions,
      },
      { attemptNumber: 2, date: null, time: null, correct: null, incorrect: null, timeTaken: null, questions: [] },
      { attemptNumber: 3, date: null, time: null, correct: null, incorrect: null, timeTaken: null, questions: [] },
    ],
  },
};

export function getLevelExplanation(level: number): LevelExplanationData | null {
  return levelExplanations[level] ?? null;
}