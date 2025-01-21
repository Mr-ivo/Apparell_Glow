import { NextResponse } from 'next/server'

export function middleware(request) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/signin' || path === '/signup'
  const isProtectedPath = path.startsWith('/dashboard')
  
  const token = request.cookies.get('auth_token')?.value
  const user = request.cookies.get('user')?.value

  if (isPublicPath && (token || user)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (isProtectedPath && !token && !user) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }
  
  return NextResponse.next()
}
 
export const config = {
  matcher: ['/dashboard/:path*', '/signin', '/signup']
}
