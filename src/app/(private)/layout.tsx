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
      <div className={"ml-14"}>{children}</div>
    </>
  );
}
