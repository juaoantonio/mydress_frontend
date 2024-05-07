import "../globals.css";
import { Sidebar } from "@/components/sidebar";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <div className={"ml-14"}>
        <main className={"grid bg-accent min-h-screen p-5"}>{children}</main>
      </div>
    </>
  );
}
