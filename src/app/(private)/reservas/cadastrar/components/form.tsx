"use client";

import { useRouter } from "next/navigation";
import { InputType } from "@/types/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createBookingSchema } from "@/schemas/booking.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

const inputs: InputType<typeof createBookingSchema>[] = [
  {
    field: "customer",
    label: "Cliente",
    inputComponentRender: (props) => <></>,
  },
];

export function CreateBookingForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof createBookingSchema>>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      status: "CONFIRMED",
      start_date: "",
      end_date: "",
      products: [],
      event: "",
      customer: "",
      notes: "",
    },
  });

  const clients = [
    {
      id: "1",
      name: "Cliente 1",
    },
    {
      id: "2",
      name: "Cliente 2",
    },
    {
      id: "3",
      name: "Cliente 3",
    },
  ];

  async function onSubmit(data: z.infer<typeof createBookingSchema>) {
    try {
      // await createBooking(data);
      router.push("/reservas");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <div className={"grid gap-3 lg:grid-cols-2 lg:gap-4"}>
          <FormField
            control={form.control}
            name={"customer"}
            render={({ field }) => (
              <FormItem className={"space-y-1"}>
                <FormLabel>Cliente</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {
                      <>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                        <Link
                          href={"/clientes/cadastrar"}
                          className={
                            "flex w-full cursor-pointer items-center gap-1 rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-gray-100 focus:bg-accent focus:text-accent-foreground"
                          }
                        >
                          <Plus size={18} />
                          Adicionar Cliente
                        </Link>
                      </>
                    }
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
