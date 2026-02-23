import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const API_BASE = 'http://127.0.0.1:8000';

const FromSection = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('* Username is required'),
      password: Yup.string()
        .min(6, 'Must be at least 6 characters')
        .required('* Password is required'),
    }),
    onSubmit: async (values) => {
      setApiError('');
      setIsLoading(true);
      const endpoint = isLogin ? '/login' : '/register';
      const params = new URLSearchParams({ username: values.username, password: values.password });
      try {
        const data = await fetch(`${API_BASE}${endpoint}?${params}`, { method: 'POST' })
        .then(res => {
            return res.json();
        })
        .then(data => {
            return data;
        });
        if (data.details === 'Login Successful!' || data.details === 'Registration Successful!') {
          login({ username: values.username });
          navigate('/inventory');
        } else {
          setApiError(data.details);
        }
      } catch (error) {
        setApiError('Could not connect to the server. Please try again.');
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    enableReinitialize: true,
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setApiError('');
    formik.resetForm();
  };

  return (
    <div>
        <div className="flex flex-col justify-center content-center gap-4 p-4">
            <div className='flex justify-center'>
                <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
            </div>
            <div>
                <p className="text-gray-600 text-center mb-6">
                    {isLogin ? 'Welcome back! Please log in.' : 'Create an account to get started.'}
                </p>
            </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col justify-center content-center gap-4 p-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    className="border border-gray-300 rounded px-4 py-2"
                />
                {formik.touched.username && formik.errors.username ? (
                    <div className="text-red-500">{formik.errors.username}</div>
                ) : null}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="border border-gray-300 rounded px-4 py-2"
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
            </div>

            {apiError && (
                <div className="text-red-500 text-sm text-center">{apiError}</div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer mt-4 bg-blue-500 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded"
            >
                {isLoading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
            </button>

            <p className="text-center text-sm text-gray-600">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <span
                    onClick={toggleMode}
                    className="text-blue-500 hover:underline cursor-pointer font-semibold"
                >
                    {isLogin ? 'Register' : 'Login'}
                </span>
            </p>
        </form>
    </div>
  );
};

export default FromSection;