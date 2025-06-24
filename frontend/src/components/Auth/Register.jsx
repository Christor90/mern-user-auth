import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

import styles from './Auth.module.css';

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data) => {
    console.log('Registration form submitted', data);

    try {
      const response = await axios.post(
        'http://localhost:5003/api/auth/register',
        data
      );

      console.log('Registration response:', response);

      if (response.status === 201) {
        toast.success('Registration successful!');
        reset(); // ✅ Clear the form fields after success

        setTimeout(() => {
          navigate('/login'); // ✅ Delay navigation so the toast shows briefly
        }, 1500);
      }
    } catch (error) {
      console.error('Registration error:', error);

      if (error.response) {
        toast.error(error.response.data.message || 'Registration failed');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      {/* React Hot Toast Container */}
      <Toaster position="top-center" reverseOrder={false} />

      <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.authTitle}>Create an Account</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Full Name
          </label>
          <input
            id="name"
            type="text"
            className={styles.input}
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name must be at least 3 characters',
              },
            })}
          />
          {errors.name && (
            <div className={styles.error}>{errors.name.message}</div>
          )}
        </div>

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
          <label htmlFor="mobile" className={styles.label}>
            Mobile Number
          </label>
          <input
            id="mobile"
            type="text"
            className={styles.input}
            {...register('mobile', {
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Mobile number must be 10 digits',
              },
            })}
          />
          {errors.mobile && (
            <div className={styles.error}>{errors.mobile.message}</div>
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
          Register
        </button>

        <p className={styles.toggleText}>
          Already have an account?{' '}
          <Link to="/login" className={styles.toggleLink}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
