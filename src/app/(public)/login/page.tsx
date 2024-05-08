import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/app/(public)/login/components";

export default function LoginPage() {
  return (
    <main>
      <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Entre com sua conta para acessar o sistema My Dress - Pro Suite
              </p>
            </div>
            <LoginForm />
            <div className="text-center text-sm flex flex-col gap-1">
              <p>Ocorreu algum problema?</p>
              <Link
                href=" https://wa.me/5591985992757"
                className="underline"
                target={"_blank"}
                rel={"external"}
              >
                Entre em contato com o suporte
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <Image
            src="https://ui.shadcn.com/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </main>
  );
}
