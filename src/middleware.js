import { NextResponse } from 'next/server'

export function middleware(request) {
  const path = request.nextUrl.pathname

  const isProtectedPath = path.startsWith('/dashboard')
  
  const user = request.cookies.get('user')?.value

  if (isProtectedPath && !user) {
    return NextResponse.redirect(new URL('/signup', request.url))
  }
  
  return NextResponse.next()
}
 
export const config = {
  matcher: '/dashboard/:path*'
}
