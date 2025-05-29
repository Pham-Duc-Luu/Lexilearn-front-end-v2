// src/test/MockProvider.tsx
import { setupWorker } from 'msw/browser';
import { ReactNode } from 'react';
import { handlers } from '../mock/handlers';

type MockProviderProps = {
  children: ReactNode;
};
export const MockProvider = ({ children }: MockProviderProps) => {
  const initMSW = async () => {
    const worker = setupWorker(...handlers);
    await worker.start({
      onUnhandledRequest: 'warn',
    });
  };

  initMSW();

  return <>{children}</>;
};
