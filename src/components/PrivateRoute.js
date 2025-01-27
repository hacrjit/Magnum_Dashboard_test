const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Check if the user's role matches the required role for the route
  if (requiredRole && requiredRole !== userRole) {
    return <Navigate to="/login" />;
  }

  return children;
};
