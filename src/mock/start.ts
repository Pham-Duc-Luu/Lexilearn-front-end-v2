// src/index.jsx
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const worker = setupWorker(...handlers);

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}
