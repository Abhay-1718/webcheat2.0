
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';  // Import the logout action from your authSlice

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    
    // Clear user data in Redux
    dispatch(logout());

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div>
      <h1>Hello from Home</h1>
      
      
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
