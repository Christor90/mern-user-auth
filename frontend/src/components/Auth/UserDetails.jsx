import { useEffect, useState } from 'react';
// import styles from './Auth.module.css';
import { LoaderIcon } from 'lucide-react';

import styles from './Auth.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details from backend
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5003/api/auth/getUserDetails',
          {
            withCredentials: true, // send cookie
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        // If not authenticated, redirect to login
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:5003/api/auth/logout',
        {},
        {
          withCredentials: true,
        }
      );
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  if (!user)
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h2 className={styles.authTitle}>User Details</h2>
        <p className="pb-2">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="pb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="pb-2">
          <strong>Mobile:</strong> {user.mobile}
        </p>

        <button onClick={handleLogout} className={styles.submitButton}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
