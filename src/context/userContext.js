import React, { createContext, useState, useEffect } from 'react';


// Create a context to hold the user role
export const UserContext = createContext();

// Create a provider component to wrap your application with the context
export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem('role') || null);  // Get the role from localStorage

  // Function to set the user role
  const setUserRole = (role) => {
    setRole(role);
    localStorage.setItem('role', role);  // Store role in localStorage
  };

  useEffect(() => {
    // You can add logic here to fetch the user role if needed
  }, []);

  return (
    <UserContext.Provider value={{ role, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to easily access the user context
export const useUser = () => {
  return React.useContext(UserContext);
};
