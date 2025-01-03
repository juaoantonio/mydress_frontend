import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers";
import { QueryProvider } from "@/providers/react-query.provider";
import { Toaster } from "sonner";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "My Dress Pro Suite - Sistema de Gerencimento de Aluguel de Vestidos",
    description: "Sistema de Gerencimento de Aluguel de Vestidos",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable,
                )}
            >
                <QueryProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                        <Toaster richColors expand />
                    </ThemeProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
