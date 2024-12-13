import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home'; 
import Auth from './components/Auth';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element }) => {
  // Check if the user is authenticated (if token exists in localStorage or in the Redux store)
  const isAuthenticated = useSelector((state) => state.auth.token || localStorage.getItem('token'));

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the protected element
  return element;
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Private route for Home page */}
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          {/* Route for login/signup */}
          <Route path="/login" element={<Auth />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
