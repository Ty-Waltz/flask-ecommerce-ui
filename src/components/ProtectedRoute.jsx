import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.func
};

export default ProtectedRoute;
