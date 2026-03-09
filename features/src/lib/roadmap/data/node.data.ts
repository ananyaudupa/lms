// All node content lives here.
// When backend is ready, replace this with an API call in RoadmapPage/RoadmapFlow.

export type NodeResource = {
  type: 'article' | 'video';
  title: string;
};

export type NodeContent = {
  description: string;
  chapters: string[];
  resources: NodeResource[];
};

export const nodeContentMap: Record<string, NodeContent> = {
  'Internet': {
    description: 'The internet is a global network connecting computers worldwide, enabling information sharing. Enables browsing, email, streaming, and communication through interconnected systems.',
    chapters: [
      'Introduction to the Internet',
      'History and Evolution of the Internet',
      'How the Internet Works',
      'Internet Services',
      'World Wide Web (WWW)',
      'Internet Protocols',
      'Uses of the Internet',
      'Advantages and Disadvantages',
      'Internet Safety and Security',
      'Future of the Internet',
    ],
    resources: [
      { type: 'article', title: "Beginner's Guide to Networking for Cybersecurity" },
      { type: 'video',   title: 'What is Internet and How Internet Works' },
    ],
  },
  'HTML': {
    description: 'HTML is the standard markup language for creating web pages. It describes the structure of a web page semantically and originally included cues for the appearance of the document.',
    chapters: [
      'Introduction to HTML',
      'HTML Document Structure',
      'HTML Elements and Tags',
      'Forms and Input',
      'Semantic HTML',
      'HTML Tables',
      'HTML Media',
      'HTML APIs',
      'Accessibility in HTML',
      'HTML Best Practices',
    ],
    resources: [
      { type: 'article', title: 'HTML Reference - MDN Web Docs' },
      { type: 'video',   title: 'HTML Full Course for Beginners' },
    ],
  },
  'CSS': {
    description: 'CSS is the language used to style HTML documents. It describes how HTML elements should be displayed on screen, paper, or in other media.',
    chapters: [
      'Introduction to CSS',
      'Selectors and Properties',
      'Box Model',
      'Flexbox Layout',
      'CSS Grid',
      'Responsive Design',
      'CSS Animations',
      'CSS Variables',
      'CSS Preprocessors',
      'CSS Best Practices',
    ],
    resources: [
      { type: 'article', title: 'CSS Tricks — Complete Guide to Flexbox' },
      { type: 'video',   title: 'CSS Full Course Including Flexbox' },
    ],
  },
  'JavaScript': {
    description: 'JavaScript is a lightweight, interpreted programming language with first-class functions. It is most well-known as the scripting language for Web pages.',
    chapters: [
      'Introduction to JavaScript',
      'Variables and Data Types',
      'Functions and Scope',
      'DOM Manipulation',
      'Events',
      'Async JavaScript',
      'ES6+ Features',
      'Error Handling',
      'JavaScript Modules',
      'JavaScript Best Practices',
    ],
    resources: [
      { type: 'article', title: 'JavaScript Guide — MDN Web Docs' },
      { type: 'video',   title: 'JavaScript Full Course for Beginners' },
    ],
  },
  'Version Control': {
    description: 'Version control is a system that records changes to a file or set of files over time so that you can recall specific versions later.',
    chapters: [
      'What is Version Control?',
      'Git Basics',
      'Branching and Merging',
      'Remote Repositories',
      'Git Workflow',
    ],
    resources: [
      { type: 'article', title: 'Git Documentation' },
      { type: 'video',   title: 'Git and GitHub for Beginners' },
    ],
  },
  'VCS Hosting': {
    description: 'VCS Hosting platforms provide cloud-based storage for version-controlled repositories, enabling collaboration across teams.',
    chapters: [
      'Introduction to VCS Hosting',
      'GitHub Basics',
      'GitLab Features',
      'Pull Requests and Code Review',
      'CI/CD Integration',
    ],
    resources: [
      { type: 'article', title: 'GitHub Docs — Getting Started' },
      { type: 'video',   title: 'GitHub for Beginners' },
    ],
  },
  'Learn a Framework': {
    description: 'Frontend frameworks provide structure and tooling for building complex, maintainable web applications efficiently.',
    chapters: [
      'Why Use a Framework?',
      'React Fundamentals',
      'Component Architecture',
      'State Management',
      'Routing in SPAs',
    ],
    resources: [
      { type: 'article', title: 'React Official Documentation' },
      { type: 'video',   title: 'React Full Course 2024' },
    ],
  },
  'AI Assisted Coding': {
    description: 'AI-assisted coding tools help developers write, review, and debug code faster using large language models and intelligent suggestions.',
    chapters: [
      'Introduction to AI Coding Tools',
      'GitHub Copilot',
      'Cursor IDE',
      'Claude Code',
      'Prompt Engineering for Code',
    ],
    resources: [
      { type: 'article', title: 'GitHub Copilot Documentation' },
      { type: 'video',   title: 'AI Coding Tools Compared 2024' },
    ],
  },
};

export function getNodeContent(label: string): NodeContent {
  return nodeContentMap[label] ?? {
    description: `Learn everything about ${label} — concepts, best practices, and real-world applications to build your skills from the ground up.`,
    chapters: [
      `Introduction to ${label}`,
      `Core Concepts of ${label}`,
      `${label} in Practice`,
      `Advanced ${label} Techniques`,
      `${label} Best Practices`,
    ],
    resources: [
      { type: 'article', title: `Getting Started with ${label}` },
      { type: 'video',   title: `${label} Full Course for Beginners` },
    ],
  };
}