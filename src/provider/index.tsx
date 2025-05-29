import { ReactNode } from 'react';
import AuthProvider from './auth.provider';
import I18Provider from './i18n.provider';

const CustomProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <I18Provider>
        <>{children}</>
      </I18Provider>
    </AuthProvider>
  );
};

export default CustomProvider;
