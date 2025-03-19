import { setupWorker } from "msw/browser"
import { handlers } from "./handlers"


// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)

export const startMockServiceWorker = async () => {
    if (typeof window === 'undefined') return
    
    const isMockEnabled = 
      process.env.NEXT_PUBLIC_MSW_MODE === 'enabled' ||
      process.env.NODE_ENV === 'development'
  
    if (!isMockEnabled) return
  
    await worker.start({
      serviceWorker: {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/mockServiceWorker.js`
      },
      onUnhandledRequest: 'bypass'
    })
  }