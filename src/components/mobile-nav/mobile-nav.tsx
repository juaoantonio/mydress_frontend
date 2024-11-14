"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
    BookUser,
    CalendarClock,
    LogOut,
    Package,
    Package2,
    PanelLeft,
} from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function MobileNav() {
    const [openMobileNav, setOpenMobileNav] = useState(false);
    const pathname = usePathname();

    function isActiveLink(href: string) {
        return pathname.slice(1).split("/")[0] === href.toString().slice(1);
    }

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:hidden sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet open={openMobileNav} onOpenChange={setOpenMobileNav}>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side="left"
                    className="flex flex-col justify-between sm:max-w-xs"
                >
                    <nav className="grid gap-3 text-lg font-medium">
                        <Link
                            href="/"
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">
                                My Dress - Pro Suite
                            </span>
                        </Link>
                        <Link
                            href={"/"}
                            className={cn(
                                "flex items-center gap-4 rounded-lg px-4 py-2 text-muted-foreground hover:text-foreground",
                                isActiveLink("/")
                                    ? "bg-accent text-accent-foreground"
                                    : "text-muted-foreground",
                            )}
                            onClick={() => setOpenMobileNav(false)}
                        >
                            <BookUser className="h-5 w-5" />
                            Reservas
                        </Link>
                        <Link
                            href="/produtos"
                            className={cn(
                                "flex items-center gap-4 rounded-lg px-4 py-2 text-muted-foreground hover:text-foreground",
                                isActiveLink("/produtos")
                                    ? "bg-accent text-accent-foreground"
                                    : "text-muted-foreground",
                            )}
                            onClick={() => setOpenMobileNav(false)}
                        >
                            <Package className="h-5 w-5" />
                            Produtos
                        </Link>
                        <Link
                            href="/agendamentos"
                            className={cn(
                                "flex items-center gap-4 rounded-lg px-4 py-2 text-muted-foreground hover:text-foreground",
                                isActiveLink("/eventos")
                                    ? "bg-accent text-accent-foreground"
                                    : "text-muted-foreground",
                            )}
                            onClick={() => setOpenMobileNav(false)}
                        >
                            <CalendarClock className="h-5 w-5 rotate-45" />
                            Agendamentos
                        </Link>
                    </nav>

                    <Button
                        variant={"outline"}
                        onClick={() => signOut()}
                        className={"flex h-auto items-center gap-2 py-2"}
                    >
                        <LogOut size={20} />
                        Sair
                    </Button>
                </SheetContent>
            </Sheet>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full"
                    >
                        <Image
                            src="/profile.png"
                            width={36}
                            height={36}
                            alt="Avatar"
                            className="overflow-hidden rounded-full"
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}
