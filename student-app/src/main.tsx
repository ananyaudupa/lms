import { StrictMode, Suspense, createContext, useContext, useState, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { theme } from './theme';
import App from './app/app';
import 'reactflow/dist/style.css';

// ─── Course Context (lives here to avoid static import of lazy-loaded @org/features) ───

type Course = {
  title: string;
  description: string;
  image: string;
  progress?: number;
  enrolled?: boolean;
};

type CourseContextType = {
  selectedCourse: Course | null;
  setSelectedCourse: (course: Course | null) => void;
};

export const CourseContext = createContext<CourseContextType | null>(null);

export function useCourse() {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error('useCourse must be used within CourseProvider');
  return ctx;
}

function CourseProvider({ children }: { children: ReactNode }) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  return (
    <CourseContext.Provider value={{ selectedCourse, setSelectedCourse }}>
      {children}
    </CourseContext.Provider>
  );
}

// ─── Page Loader ───

function PageLoader() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );
}

// ─── Root ───

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CourseProvider>
          <Suspense fallback={<PageLoader />}>
            <App />
          </Suspense>
        </CourseProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);