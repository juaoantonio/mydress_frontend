import Calendar from "@/components/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardHome() {
  return (
    <section className={"grid grid-cols-3"}>
      <Card className={"col-span-full h-[75vh]"}>
        <CardHeader>
          <CardTitle>Calendário de Reservas</CardTitle>
        </CardHeader>
        <CardContent className={"h-full"}>
          <Calendar />
        </CardContent>
      </Card>
    </section>
  );
}
