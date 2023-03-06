import { createContext, useContext, useEffect, useState } from 'react';
import { signup, login, checkPermission } from '../api/auth.js';
import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);

export function useAuth() {
  useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);

  const { pathname } = useLocation();

  useEffect(() => {
    async function checkTokenIsValid() {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }

      const result = await checkPermission(authToken);

      if (result) {
        setIsAuthenticated(true);
        const tempPayload = jwt.decode(authToken);
        setPayload(tempPayload);
      } else {
        setIsAuthenticated(false);
        setPayload(null);
      }
    }

    checkTokenIsValid();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.sub,
          name: payload.name,
        },
        register: async (data) => {
          const { success, authToken } = await signup({
            username: data.username,
            email: data.email,
            password: data.password,
          });

          const tempPayload = jwt.decode(authToken);

          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }

          return success;
        },
        login: async (data) => {
          const { success, authToken } = await login({
            username: data.username,
            password: data.password,
          });

          const tempPayload = jwt.decode(authToken);

          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }

          return success;
        },
        logout: () => {
          localStorage.removeItem('authToken');
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
