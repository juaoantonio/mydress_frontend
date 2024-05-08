import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth) {
    const url = req.nextUrl.origin + "/login";
    console.log(url);
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};
