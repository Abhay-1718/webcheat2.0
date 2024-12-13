import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:4000'; // Ensure correct URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password match validation for signup
    if (isSignup && formData.password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    const endpoint = isSignup ? '/api/auth/register' : '/api/auth/login';

    try {
      console.log('Sending request to backend with data:', formData); // Log the data being sent

      const { data } = await axios.post(`${backendUrl}${endpoint}`, formData);

      console.log('Backend response:', data); // Log the response from the backend

      if (data.success) {
        localStorage.setItem('token', data.token);
        dispatch(login({ user: formData, token: data.token }));
        navigate('/');
        alert(isSignup ? 'Registration successful' : 'Login successful');
      } else {
        setError(data.message || 'An error occurred, please try again');
      }
    } catch (err) {
      console.error('Error during request:', err.response || err.message);
      setError('An error occurred. Please try again.');
    }
  };



  return (
    <div className="bg-black text-white flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-5xl flex-col md:flex-row items-stretch">
        <div className="w-full md:w-1/2 p-8 border rounded-lg border-gray-700 bg-black flex flex-col justify-center">
          <h3 className="text-2xl font-bold">{isSignup ? 'Sign Up' : 'Login'}</h3>
          <p className="mt-2 text-sm text-gray-400">
            {isSignup ? 'Create an account to get started.' : 'Welcome back! Please login.'}
          </p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <form onSubmit={handleSubmit} className="mt-6">
            {isSignup && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-gray text-sm border-none text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray text-sm border-none text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray text-sm border-none text-black focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                required
              />
            </div>
            {isSignup && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 rounded-lg bg-gray text-sm border-none text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}
            <div className="mt-4 flex items-center justify-end gap-x-2">
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2"
              >
                {isSignup ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
              </button>
              <button
                type="submit"
                className="font-semibold hover:bg-black hover:text-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm bg-white text-black h-10 px-4 py-2"
              >
                {isSignup ? 'Sign Up' : 'Login'}
              </button>
            </div>
          </form>
        </div>
        <div className="hidden md:flex flex-col items-center mx-6">
          <div className="w-px h-full bg-gray-600"></div>
        </div>
        <div className="hidden md:flex flex-col items-center gap-4 w-1/2">
          <img src='' alt="Illustration" className="max-w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
