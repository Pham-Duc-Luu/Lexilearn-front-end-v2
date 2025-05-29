import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from '../i18n.ts';

const I18Provider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
    </>
  );
};

export default I18Provider;
