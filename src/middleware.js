import { auth0 } from "./lib/auth0.js";

export async function middleware(request) {
  console.log("🔥 Middleware running for:", request.nextUrl.pathname);
  
  if (request.nextUrl.pathname.startsWith('/auth')) {
    console.log("🔐 Handling auth route:", request.nextUrl.pathname);
  }
  
  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};