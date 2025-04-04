import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { NewTokensProps, UserProps } from "./types";
import { checkUserPermission } from "./lib/checkUserPermissions";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function middleware(req: NextRequest) {
  // Define route permissions with specific permission names
  const protectedRoutes = {
    "/request-loan": "request_loan",
    "/dashboard": "get_dashboard",
    "/reports": "get_loans",
    "/pending-loans": ["get_loan", "get_loans"],
    "/department-approval": "get_loans",
    "/approved-loans": ["get_loan", "get_loans"],
    "/loans/departments/:path*": "get_loans",
  };

  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const userResponse = await fetch(`${baseUrl}/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (userResponse.ok) {
      const user: UserProps = await userResponse.json();

      return checkRoutePermissions(req, user, protectedRoutes);
    }

    const isTokenExpired = checkTokenExpiration(accessToken);

    if (isTokenExpired) {
      const refreshToken = req.cookies.get("refreshToken")?.value;

      if (!refreshToken) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      const refreshResponse = await fetch(`${baseUrl}/auth/refresh`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      if (refreshResponse.ok) {
        const data: NewTokensProps = await refreshResponse.json();

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data;

        const userResponse = await fetch(`${baseUrl}/user/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        });

        if (userResponse.ok) {
          const user: UserProps = await userResponse.json();

          const response = checkRoutePermissions(req, user, protectedRoutes);

          response.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
          });

          response.cookies.set("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
          });

          return response;
        }
      }
    }

    return NextResponse.redirect(new URL("/", req.url));
  } catch (error) {
    console.error("Authentication middleware error:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

function checkTokenExpiration(token: string): boolean {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return !decodedToken.exp || decodedToken.exp < currentTime;
  } catch {
    return true;
  }
}

function checkRoutePermissions(
  req: NextRequest,
  user: UserProps,
  protectedRoutes: Record<string, string | string[]>
): NextResponse {
  const matchedRoute = Object.entries(protectedRoutes).find(([route]) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (matchedRoute) {
    const [, requiredPermissions] = matchedRoute;
    const hasPermission = checkUserPermission(user, requiredPermissions);

    if (!hasPermission) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/pending-loans",
    "/loans/departments/:path*",
    "/department-approval",
    "/approved-loans",
    "/request-loan",
    "/reports",
  ],
};
