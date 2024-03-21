import { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import AppContext from '../contexts/AppContext';

function ProtectedRoute() {
  const { session } = useContext(AppContext);
  const location = useLocation();

  console.log(session);

  if (!session) {
    return <Navigate to="/" replace state={{ path: location.pathname }} />;
  }
  return <Outlet />;
}

export default ProtectedRoute;