import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// The import path below is now fixed
import { AppContext } from '../context/AppContext.jsx';

const AdminRoute = () => {
  const { user, token } = useContext(AppContext);

  // Check 1: Is the data still loading? (Good practice)
  // If you don't have a loading state, you can skip this.
  // if (loading) {
  //   return <div>Loading...</div>; 
  // }

  // Check 2: Is there a user and do they have an Admin role?
  const isAdmin = user && user.roles && user.roles.includes('ROLE_ADMIN');

  // If logged in and is an admin, show the dashboard.
  // Otherwise, redirect to the homepage.
  return (
    token && isAdmin ? <Outlet /> : <Navigate to="/" replace />
  );
};

export default AdminRoute;

