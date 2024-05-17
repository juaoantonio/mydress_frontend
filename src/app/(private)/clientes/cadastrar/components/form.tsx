"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createCustomerSchema } from "@/schemas/customer.schemas";
import { toast } from "sonner";
import { customersService } from "@/services/customers/customers.service";
import { getSession } from "next-auth/react";

type InputType = {
  field: keyof z.infer<typeof createCustomerSchema>;
  label: string;
  placeholder?: string;
};

const inputs: InputType[] = [
  {
    field: "name",
    label: "Nome",
  },
  {
    field: "email",
    label: "Email",
    placeholder: "fulano@gmail.com",
  },
  {
    field: "cpf",
    label: "CPF",
    placeholder: "00011122289",
  },
  {
    field: "rg",
    label: "RG",
    placeholder: "7001112",
  },
  {
    field: "address",
    label: "Endereço",
  },

  {
    field: "phone",
    label: "Telefone",
    placeholder: "91999221212 ",
  },
];

export function CreateCustomerForm() {
  const form = useForm<z.infer<typeof createCustomerSchema>>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      rg: "",
      address: "",
      phone: "",
      notes: "",
    },
  });

  async function onSubmit(data: z.infer<typeof createCustomerSchema>) {
    const session = await getSession();
    console.log(session);

    if (!session) {
      toast.error("Você precisa estar logado para cadastrar um cliente!");
      return;
    }

    const result = await customersService.create(data, session.user.access);

    if (result.errors) {
      result.errors.map((error) => {
        const field = error.field as keyof z.infer<typeof createCustomerSchema>;
        const message = error.messages[0].replace("customer", "Cliente");
        form.setError(field, { message });
      });

      return;
    }

    toast.success("Cliente cadastrado com sucesso!");

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <div className={"grid-cols-2 grid gap-4"}>
          {inputs.map((input) => (
            <FormField
              key={input.field}
              control={form.control}
              name={input.field}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{input.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={input.placeholder} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <FormField
            control={form.control}
            name={"notes"}
            render={({ field }) => (
              <FormItem className={"col-span-full"}>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea rows={10} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type={"submit"} disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Carregando..." : "Cadastrar"}
        </Button>
      </form>
    </Form>
  );
}
