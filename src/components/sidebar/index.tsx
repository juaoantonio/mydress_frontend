import { BookUser, Home, Package, PartyPopper, Users2 } from "lucide-react";
import SidebarRoot from "@/components/sidebar/sidebar.root";
import SidebarItem from "@/components/sidebar/sidebar.item";

export function Sidebar() {
  return (
    <SidebarRoot>
      <SidebarItem
        tooltipText={"Painel Principal"}
        link={"/"}
        icon={{
          Component: Home,
        }}
      />
      <SidebarItem
        tooltipText={"Reservas"}
        link={"/reservas"}
        icon={{
          Component: BookUser,
        }}
      />
      <SidebarItem
        tooltipText={"Produtos"}
        link={"/produtos"}
        icon={{
          Component: Package,
        }}
      />
      <SidebarItem
        tooltipText={"Eventos"}
        link={"/eventos"}
        icon={{
          Component: PartyPopper,
        }}
      />
      <SidebarItem
        tooltipText={"Clientes"}
        link={"/clientes/cadastrar"}
        icon={{
          Component: Users2,
        }}
      />
    </SidebarRoot>
  );
}
