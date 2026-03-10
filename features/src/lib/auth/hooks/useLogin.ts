import { useState } from 'react';

export type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type LoginFormErrors = {
  email?: string;
  password?: string;
};

export const useLogin = () => {
  const [values, setValues] = useState<LoginFormValues>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: LoginFormErrors = {};
    if (!values.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!values.password) {
      newErrors.password = 'Password is required';
    } else if (values.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof LoginFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues(prev => ({
        ...prev,
        [field]: field === 'rememberMe' ? e.target.checked : e.target.value,
      }));
      if (errors[field as keyof LoginFormErrors]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // TODO: replace with real API call
      await new Promise(res => setTimeout(res, 1500));
      window.location.href = '/dashboard';
    } finally {
      setLoading(false);
    }
  };

  return { values, errors, loading, handleChange, handleSubmit };
};