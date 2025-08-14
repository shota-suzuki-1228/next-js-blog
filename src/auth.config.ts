import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
    signOut: 'http://localhost:3000/', 
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard') 
      || nextUrl.pathname.startsWith('/manage');
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        // callbackUrlパラメータなしでリダイレクト
        return Response.redirect(new URL('/login', nextUrl));
      } else if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;