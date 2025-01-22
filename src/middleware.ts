import { NextResponse } from "next/server";
import { auth } from "./auth";
import { authRoutes, publicRouter } from "./routes";

/**
 * Middleware to handle authentication and route access control.
 *
 * This middleware checks if the user is authenticated and determines
 * the appropriate response based on the requested route.
 *
 * - Public routes are accessible to everyone.
 * - Auth routes are accessible to authenticated users only.
 * - Other routes redirect unauthenticated users to the login page.
 *
 * @param req - The incoming request object.
 * @returns {NextResponse} - The response object based on the authentication and route checks.
 *
 * @example
 * // Example usage in a Next.js application
 * import middleware from './middleware';
 *
 * export default function handler(req, res) {
 *   return middleware(req);
 * }
 *
 * @see {@link NextResponse}
 * @see {@link auth}
 * @see {@link authRoutes}
 * @see {@link publicRouter}
 */

/**
 * Configuration object for the middleware matcher.
 *
 * This configuration specifies the routes that the middleware should apply to.
 * It excludes API routes, Next.js static files, and other specific files.
 *
 * @type {Object}
 * @property {string[]} matcher - An array of route patterns to match.
 *
 * @example
 * // Example matcher configuration
 * export const config = {
 *   matcher: [
 *     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
 *   ],
 * };
 */
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isPublic = publicRouter.includes(nextUrl.pathname);
  const isAuthRouter = authRoutes.includes(nextUrl.pathname);

  if (isPublic) {
    return NextResponse.next();
  }

  if (isAuthRouter) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/members", nextUrl));
    }

    return NextResponse.next();
  }

  if (!isPublic && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
