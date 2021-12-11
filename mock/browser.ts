import { setupWorker } from 'msw'
import { handler } from './handler'
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handler)