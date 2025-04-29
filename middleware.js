import { NextResponse } from "next/server";
import axios from "axios"; // Make sure axios is imported

export async function middleware(req) {
  const authToken = req.cookies.get("auth_token_font")?.value;
  const url = req.nextUrl.clone();
  let user = null;

  if (authToken) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      user = response?.data?.data?.user;
    } catch (error) {
      // Optional: clear invalid token
      const res = NextResponse.redirect(new URL("/auth/login", req.url));
      res.cookies.set("auth_token_font", "", { maxAge: 0 });
      return res;
    }
  }

  const protectedPaths = [
    { href: "/dashboard", roles: ["Merchant", "Admin"] },
    { href: "/dashboard/cash-in", roles: ["Merchant"] },
    { href: "/dashboard/payout", roles: ["Merchant"] },
    { href: "/dashboard/settlement", roles: ["Merchant"] },
    { href: "/dashboard/payments", roles: ["Merchant"] },
    { href: "/dashboard/statement", roles: ["Merchant"] },
    { href: "/dashboard/developer", roles: ["Merchant", "Admin"] },
    { href: "/dashboard/support", roles: ["Merchant"] },
    { href: "/dashboard/reports", roles: ["Merchant"] },
    { href: "/dashboard/settings", roles: ["Admin"] },
  ];

  const hasRole = (roleNames = []) =>
    user?.roles?.some((role) => roleNames.includes(role.name));

  const isProtectedPath = protectedPaths.some((item) => {
    return url.pathname.startsWith(item.href) && !hasRole(item.roles);
  });

  // যদি টোকেন না থাকে এবং পাথ প্রোটেক্টেড হয়
  if (!authToken && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // যদি টোকেন থাকে, কিন্তু সেই route এর জন্য অনুমোদিত না হয়
  if (authToken && isProtectedPath) {
    url.pathname = "/dashboard"; // Optional: you can change this to any 403 page
    return NextResponse.redirect(url);
  }

  // যদি ইউজার আগে থেকেই লগইন করা থাকে এবং login বা register পেজে ঢুকতে চায়
  if ((url.pathname === "/auth/login" || url.pathname === "/auth/register") && authToken) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
