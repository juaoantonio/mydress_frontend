import { auth } from "@/auth";

export default auth((req) => {
    if (!req.auth) {
        const url = req.nextUrl.origin + "/login";
        return Response.redirect(url);
    }
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};
