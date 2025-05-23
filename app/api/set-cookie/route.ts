import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  try {
    const { accessToken, refreshToken } = await req.json();

    const response = NextResponse.json({ message: "Cookies set successfully" });

    // Serialize both cookies

    const accessTokenCookie = serialize("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    const refreshTokenCookie = serialize("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    // Set both cookies in the header
    response.headers.set(
      "Set-Cookie",
      `${accessTokenCookie}, ${refreshTokenCookie}`
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to set cookies ${error}` },
      { status: 500 }
    );
  }
}
