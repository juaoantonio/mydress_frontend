"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  BookUser,
  Home,
  Package,
  Package2,
  PanelLeft,
  PartyPopper,
  Users2,
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

export default function MobileNav() {
  const pathname = usePathname();

  function isActiveLink(href: string) {
    return pathname.slice(1).split("/")[0] === href.toString().slice(1);
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 justify-between sm:hidden sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-3 text-lg font-medium">
            <Link
              href="/"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">My Dress - Pro Suite</span>
            </Link>
            <Link
              href={"/"}
              className={cn(
                "flex items-center gap-4 py-2 px-4 rounded-lg text-muted-foreground hover:text-foreground",
                isActiveLink("/")
                  ? "bg-accent text-accent-foreground"
                  : " text-muted-foreground",
              )}
            >
              <Home className="h-5 w-5" />
              Painel Principal
            </Link>
            <Link
              href={"/reservas"}
              className={cn(
                "flex items-center gap-4 py-2 px-4 rounded-lg text-muted-foreground hover:text-foreground",
                isActiveLink("/reservas")
                  ? "bg-accent text-accent-foreground"
                  : " text-muted-foreground",
              )}
            >
              <BookUser className="h-5 w-5" />
              Reservas
            </Link>
            <Link
              href="/produtos"
              className={cn(
                "flex items-center gap-4 py-2 px-4 rounded-lg text-muted-foreground hover:text-foreground",
                isActiveLink("/produtos")
                  ? "bg-accent text-accent-foreground"
                  : " text-muted-foreground",
              )}
            >
              <Package className="h-5 w-5" />
              Produtos
            </Link>
            <Link
              href="/eventos"
              className={cn(
                "flex items-center gap-4 py-2 px-4 rounded-lg text-muted-foreground hover:text-foreground",
                isActiveLink("/eventos")
                  ? "bg-accent text-accent-foreground"
                  : " text-muted-foreground",
              )}
            >
              <PartyPopper className="h-5 w-5" />
              Eventos
            </Link>
            <Link
              href="/clientes/cadastrar"
              className={cn(
                "flex items-center gap-4 py-2 px-4 rounded-lg text-muted-foreground hover:text-foreground",
                isActiveLink("/clientes")
                  ? "bg-accent text-accent-foreground"
                  : " text-muted-foreground",
              )}
            >
              <Users2 className="h-5 w-5" />
              Clientes
            </Link>
          </nav>
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
              src="https://randomuser.me/api/portraits/women/24.jpg"
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
