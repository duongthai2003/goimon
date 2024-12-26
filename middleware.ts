import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePath = ["/me"];
const authPath = ["/login", "/register"];
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value;
  // nếu chưa đang đăng nhập thì chuyển về login
  if (privatePath.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // nếu path là authPath và có session thì không chô vào :/login", "/register nữa mà chuyển về home

  if (authPath.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [...privatePath, ...authPath],
};
