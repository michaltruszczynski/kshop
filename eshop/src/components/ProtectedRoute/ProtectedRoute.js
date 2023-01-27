import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ children, path, onlyAuth = true, allowedRoles = [] }) => {
      const authState = useSelector(state => state.auth);
      const { userId, userRole } = authState;

      const isAuthorised = () => {
            if (!onlyAuth) return true;

            return !!userId && allowedRoles.includes(userRole)
      }

      return (
            isAuthorised() ?
                  <Route path={path}>
                        {children}
                  </Route>
                  :
                  <Redirect to={{
                        pathname: '/'
                  }} />
      );
}

export default ProtectedRoute;