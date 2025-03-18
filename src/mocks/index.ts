import { server } from './server';

// Start the MSW worker in the browser environment
async function initMocks() {
    if (typeof window === "undefined") {
      const {server} = await import("./server")
      server.listen()
    } else {
      const { worker } = await import("./browser")
      worker.start({
        onUnhandledRequest: "bypass", // Don't warn about unhandled requests
      })
    }
  }
  
  export default initMocks
  
  