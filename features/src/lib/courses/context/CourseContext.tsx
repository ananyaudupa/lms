type Course = {
  title: string;
  description: string;
  image: string;
  progress?: number;
  enrolled?: boolean;
};

// sessionStorage-backed store — survives full page reloads
export const courseStore = {
  get: (): Course | null => {
    try {
      const raw = sessionStorage.getItem('selectedCourse');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  set: (course: Course | null) => {
    if (course) {
      sessionStorage.setItem('selectedCourse', JSON.stringify(course));
    } else {
      sessionStorage.removeItem('selectedCourse');
    }
  },
};