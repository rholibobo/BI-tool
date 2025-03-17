import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/auth/login" || path === "/auth/register" || path === "/"

  // Check if user is authenticated
  const token = request.cookies.get("auth-token")?.value || ""

  // Redirect logic
  if (isPublicPath && token) {
    // If user is authenticated and tries to access public path, redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (!isPublicPath && !token) {
    // If user is not authenticated and tries to access protected path, redirect to login
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Match all paths except for:
    // - API routes
    // - Static files (e.g., favicon.ico)
    // - Public files
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}

