import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/investor/login',
  },
});

export const config = {
  matcher: [
    '/investor/:path*',
  ],
};