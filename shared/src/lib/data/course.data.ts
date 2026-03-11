// Single source of truth for all course data.
// Used by both CoursesPage and DashboardContinueLearning.

export type CourseItem = {
  title: string;
  description: string;
  image: string;
  enrolled?: boolean;
  progress?: number;
};

export const roleBasedCourses: CourseItem[] = [
  { title: 'Frontend',        description: 'Build modern, responsive, and interactive user interfaces with cutting-edge frontend technologies.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=220&fit=crop', enrolled: true, progress: 17 },
  { title: 'Backend',         description: 'Design robust, scalable, and secure server-side systems that power seamless digital experiences.', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=220&fit=crop' },
  { title: 'Full Stack',      description: 'Develop end-to-end applications by mastering both frontend and backend technologies for complete web solutions.', image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&h=220&fit=crop' },
  { title: 'DevOps',          description: 'Streamline development and deployment with automation, CI/CD, and scalable cloud infrastructure practices.', image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=220&fit=crop' },
  { title: 'DevSecOps',       description: 'Integrate security into every stage of development and operations to build resilient, secure, and compliant systems.', image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=220&fit=crop' },
  { title: 'Data Analyst',    description: 'Turn raw data into actionable insights using analytics, visualization, and data-driven decision-making.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=220&fit=crop' },
  { title: 'AI Engineer',     description: 'Build modern, responsive, and interactive user interfaces with cutting-edge frontend technologies.', image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=220&fit=crop' },
  { title: 'AI & Data Scientist', description: 'Leverage AI and data science to uncover insights, build predictive models, and drive smarter decisions.', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=220&fit=crop' },
  { title: 'Data Engineer',   description: 'Build scalable data pipelines and architectures to collect, process, and deliver reliable data for analytics and AI.', image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=220&fit=crop', enrolled: true, progress: 100 },
  { title: 'Android',         description: 'Design and build high-performance Android apps with modern tools, seamless UX, and scalable architecture.', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=220&fit=crop' },
  { title: 'Machine Learning', description: 'Build intelligent models that learn from data to make predictions, automate tasks, and drive smarter solutions.', image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=220&fit=crop' },
  { title: 'PostgreSQL',      description: 'Turn raw data into actionable insights using analytics, visualization, and data-driven decision-making.', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=220&fit=crop' },
];

export const upskillingCourses: CourseItem[] = [
  { title: 'SQL',             description: 'Master SQL to efficiently manage, query, and analyze data across relational databases.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=220&fit=crop', enrolled: true, progress: 40 },
  { title: 'Computer Science', description: 'Master core computing principles—from algorithms to systems—to solve complex problems and build efficient software.', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=220&fit=crop' },
  { title: 'React',           description: 'Build dynamic, component-based user interfaces with React for fast, scalable, and modern web applications.', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=220&fit=crop' },
  { title: 'Vue',             description: 'Create lightweight, reactive, and flexible user interfaces with Vue for modern web applications.', image: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=400&h=220&fit=crop' },
  { title: 'Angular',         description: 'Build scalable, enterprise-grade web applications with Angular using a structured, component-driven architecture.', image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=220&fit=crop' },
  { title: 'JavaScript',      description: 'Master JavaScript to build dynamic, interactive, and high-performance web applications.', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=220&fit=crop' },
  { title: 'TypeScript',      description: 'Build modern, responsive, and interactive user interfaces with cutting-edge frontend technologies.', image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=220&fit=crop' },
  { title: 'Node.js',         description: 'Leverage AI and data science to uncover insights, build predictive models, and drive smarter decisions.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=220&fit=crop' },
  { title: 'Python',          description: 'Build scalable data pipelines and architectures to collect, process, and deliver reliable data for analytics and AI.', image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=220&fit=crop' },
  { title: 'System Design',   description: 'Design and build high-performance Android apps with modern tools, seamless UX, and scalable architecture.', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=220&fit=crop' },
  { title: 'Java',            description: 'Build intelligent models that learn from data to make predictions, automate tasks, and drive smarter solutions.', image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&h=220&fit=crop' },
  { title: 'ASP.NET Core',    description: 'Turn raw data into actionable insights using analytics, visualization, and data-driven decision-making.', image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=220&fit=crop' },
];

// Helper — find a course by title across both lists
export function findCourse(title: string): CourseItem | undefined {
  return [...roleBasedCourses, ...upskillingCourses].find(c => c.title === title);
}