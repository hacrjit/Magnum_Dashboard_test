import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import SchoolImage from '../components/images/School.jpg';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role set to student
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const [popupMessage, setPopupMessage] = useState('');
  // eslint-disable-next-line
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const url = isSignUp
        ? 'http://localhost:5000/api/signup'
        : 'http://localhost:5000/api/login';

      const data = isSignUp
        ? { username, email, password, role }
        : { username, password };

      const response = await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (isSignUp) {
        setIsSignUp(false);
        clearFields();
        setPopupMessage('Account Created Successfully!');
        setShowPopup(true);
      } else {
        const { token, role } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('username', username);

        setPopupMessage('Login Successful!');
        setShowPopup(true);

        // Redirect based on role after login
        if (role === 'admin') {
          navigate('/dashboard/admin');
        } else if (role === 'student') {
          navigate('/dashboard/student');
        } else if (role === 'teacher') {
          navigate('/dashboard/teacher');
        } else if (role === 'parent') {
          navigate('/dashboard/parent');
        }
      }
    } catch (err) {
      setError(isSignUp ? 'Error creating account. Please try again.' : 'Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  const clearFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleToggle = () => {
    clearFields();
    setIsSignUp(!isSignUp);
  };
  // eslint-disable-next-line
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const backgroundStyle = {
    backgroundImage: `url(${SchoolImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 0,
  };

  const mainContainerStyle = {
    height: '100vh',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={mainContainerStyle}>
      <div style={backgroundStyle} className="login-main-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="bold-text">{isSignUp ? 'Create an Account' : 'Welcome Back'}</h2>
          {error && <p className="error-message">{error}</p>}

          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="bold-input"
          />

          {isSignUp && (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bold-input"
              />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bold-input"
              />
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bold-input"
              />
            </>
          )}

          {!isSignUp && (
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bold-input"
            />
          )}

          {isSignUp && (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="bold-input"
            >
              <option value="admin">Admin</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
            </select>
          )}

          <button type="submit" className="bold-button" disabled={isLoading}>
            {isLoading
              ? isSignUp
                ? 'Signing Up...'
                : 'Logging In...'
              : isSignUp
              ? 'Sign Up'
              : 'Login'}
          </button>

          <p className="toggle-link bold-text">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
            <span onClick={handleToggle}>
              {isSignUp ? 'Log in' : 'Sign up'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
