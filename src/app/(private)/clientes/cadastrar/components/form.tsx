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
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { InputType } from "@/types/input";

const inputs: InputType<typeof createCustomerSchema>[] = [
  {
    field: "name",
    label: "Nome",
    inputComponentRender: (props) => <Input {...props} />,
  },
  {
    field: "email",
    label: "Email",
    placeholder: "fulano@gmail.com",
    inputComponentRender: (props) => <Input {...props} />,
  },
  {
    field: "cpf",
    label: "CPF",
    placeholder: "00011122289",
    inputComponentRender: (props) => <Input {...props} />,
  },
  {
    field: "rg",
    label: "RG",
    placeholder: "7001112",
    inputComponentRender: (props) => <Input {...props} />,
  },
  {
    field: "address",
    label: "Endereço",
    inputComponentRender: (props) => <Input {...props} />,
  },

  {
    field: "phone",
    label: "Telefone",
    placeholder: "91999221212 ",
    inputComponentRender: (props) => <Input {...props} />,
  },
  {
    field: "notes",
    label: "Observações",
    inputComponentRender: (props) => <Textarea {...props} />,
  },
];

export function CreateCustomerForm() {
  const router = useRouter();
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

    router.push("/clientes");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <div className={"grid gap-3 lg:grid-cols-2 lg:gap-4"}>
          {inputs.map((input) => (
            <FormField
              key={input.field}
              control={form.control}
              name={input.field}
              render={({ field }) => (
                <FormItem className={"space-y-1"}>
                  <FormLabel>{input.label}</FormLabel>
                  <FormControl>
                    {input.inputComponentRender({
                      placeholder: input.placeholder,
                      ...field,
                    })}
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
                  <Textarea rows={6} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className={"justfy-between flex gap-2"}>
          <Button type={"button"} variant={"outline"} className={"flex-1"}>
            <Link href={"/clientes"}>Cancelar</Link>
          </Button>
          <Button
            type={"submit"}
            disabled={form.formState.isSubmitting}
            className={"flex-1"}
          >
            {form.formState.isSubmitting ? "Carregando..." : "Cadastrar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
