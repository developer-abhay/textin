import { isAuthenticated } from "@/utils/Auth";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ['/']

export default function middleware(req: NextRequest) {
    if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
        const absoluteURL = new URL("/login", req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL)
    }
} 