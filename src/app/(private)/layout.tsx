import "../globals.css";
import { Sidebar } from "@/components/sidebar/sidebar";
import MobileNav from "@/components/mobile-nav/mobile-nav";

export default function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Sidebar />
            <MobileNav />
            <div className={"sm:ml-14"}>
                <main className={"bg-background p-3"}>{children}</main>
            </div>
        </>
    );
}
