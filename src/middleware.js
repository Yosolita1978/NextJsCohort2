import { auth0 } from "./lib/auth0.js";

export async function middleware(request) {
  // In Next.js 15, we need to handle the request differently
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  console.log("🔥 Middleware running for:", pathname);
  
  if (pathname.startsWith('/auth')) {
    console.log("🔐 Handling auth route:", pathname);
  }
  
  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};