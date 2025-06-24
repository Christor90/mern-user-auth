import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

import styles from './Auth.module.css';

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const onSubmit = async (data) => {
    console.log('Registration form submitted', data);

    try {
      const response = await axios.post(
        'http://localhost:5003/api/auth/login',
        data,
        {
          withCredentials: true,
        }
      );
      console.log('Login response:', response);

      if (response.status === 201) {
        toast.success('Login successful!'); // ✅ Show success toast
        reset(); // ✅ Clear the form fields after success

        setTimeout(() => {
          navigate('/userDetails'); // ✅ Delay navigation so the toast is visible
        }, 1500);
      }
    } catch (error) {
      console.error('Login error:', error);

      if (error.response) {
        toast.error(error.response.data.message || 'Login failed'); // ✅ Show error toast
      } else {
        toast.error('An unexpected error occurred. Please try again.'); // ✅ Show network error toast
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      {/* React Hot Toast Container */}
      <Toaster position="top-center" reverseOrder={false} />

      <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.authTitle}>Login</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <div className={styles.error}>{errors.email.message}</div>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            className={styles.input}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && (
            <div className={styles.error}>{errors.password.message}</div>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>
          Login
        </button>

        <p className={styles.toggleText}>
          Don't have an account?{' '}
          <Link to="/register" className={styles.toggleLink}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
