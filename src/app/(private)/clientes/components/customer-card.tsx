"use client";

import { Card } from "@/components/ui/card";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { CustomerType } from "@/types/customer.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { getSession } from "next-auth/react";
import { CustomersService } from "@/services/customers/customer.service";
import { useRouter } from "next/navigation";

export function CustomerCard({ customer }: { customer: CustomerType }) {
  const customerService = new CustomersService();
  const router = useRouter();
  async function handleCustomerDelete(id: string) {
    const session = await getSession();
    if (!session) {
      toast.error("Você precisa estar logado para cadastrar um cliente!");
      return;
    }

    const loadingToast = toast.loading("Removendo cliente...");

    try {
      await customerService.deleteById(id);
      router.refresh();
      toast.success("Cliente removido com sucesso!");
    } catch (error) {
      toast.error("Erro ao remover cliente.");
      console.error(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  return (
    <Card
      className={
        "relative h-full space-y-2 overflow-hidden rounded-lg p-4 after:absolute after:left-0 after:top-0 after:block after:h-full after:w-1 after:bg-primary"
      }
    >
      <div className={"flex justify-between"}>
        <h2 className={"text-lg font-semibold leading-none tracking-tight"}>
          {customer.name}
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className={"block rounded-2xl p-1 hover:bg-secondary"}>
              <EllipsisVertical size={24} />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className={"flex items-center gap-1.5"}>
              <Pencil size={16} className={"text-orange-400"} /> Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              className={"flex items-center gap-1.5"}
              onClick={() => handleCustomerDelete(customer.id)}
            >
              <Trash size={16} className={"text-pink-500"} />
              Remover
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className={"text-sm"}>
        <p>
          <strong className={"font-semibold"}>Telefone: </strong>
          {customer.phone}
        </p>
        <p>
          <strong className={"font-semibold"}>CPF: </strong>
          {customer.cpf}
        </p>
        <p>
          <strong className={"font-semibold"}>Email: </strong>
          {customer.email}
        </p>
        <p>
          <strong className={"font-semibold"}>Endereço: </strong>
          {customer.address}
        </p>
      </div>
    </Card>
  );
}
