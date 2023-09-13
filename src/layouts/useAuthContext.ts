import { useContext } from 'react';

import { AuthContext } from './AuthContext';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('AuthContext must be use inside AuthProvider');

  return context;
};
