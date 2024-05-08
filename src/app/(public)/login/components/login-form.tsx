"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSignSchema } from "@/schemas/user.schemas";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof userSignSchema>>({
    resolver: zodResolver(userSignSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  async function onSubmit(credentials: z.infer<typeof userSignSchema>) {
    const toastId = toast.loading("Enviando seus dados...");

    const result = await signIn("credentials", {
      ...credentials,
      redirect: false,
    }).finally(() => toast.dismiss(toastId));

    if (result?.error) {
      toast.error(
        "Algo deu errado! Tente novamente ou entre em contato com o suporte.",
      );
      return;
    }

    toast.success("Login realizado com sucesso!");
    router.replace("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          name={"username"}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input {...field} placeholder={"exemplo_usuario"} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={"password"}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input {...field} type={"password"} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full"
          type={"submit"}
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Carregando..." : "Entrar"}
        </Button>
      </form>
    </Form>
  );
}
