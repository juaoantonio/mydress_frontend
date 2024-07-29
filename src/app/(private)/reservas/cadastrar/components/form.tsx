"use client";

import { useRouter } from "next/navigation";
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
import React from "react";
import { SelectWithAdd } from "@/components/select-with-add";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { addDays, format, setDefaultOptions } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import {
  clients,
  dresses,
  events,
} from "@/app/(private)/reservas/cadastrar/components/mocks";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

setDefaultOptions({ locale: ptBR });

export function CreateBookingForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof createBookingSchema>>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      status: "CONFIRMED",
      event: "",
      range_date: {
        start_date: new Date(),
        end_date: addDays(new Date(), 4),
      },
      customer: "",
      notes: "",
    },
  });

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
          <SelectWithAdd
            control={form.control}
            name={"customer"}
            label={"Selecionar Cliente"}
            options={clients}
            addActionLink={"/clientes/cadastrar"}
            addActionMessage={"Criar cliente"}
          />

          <SelectWithAdd
            control={form.control}
            name={"event"}
            label={"Evento"}
            options={events}
            addActionMessage={"Criar evento"}
            addActionLink={"/eventos/cadastrar"}
          />

          <FormField
            control={form.control}
            name={"range_date"}
            render={({ field }) => (
              <FormItem className={"col-span-full space-y-1"}>
                <FormLabel>Período da reserva</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "flex w-[300px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value.start_date ? (
                          field.value.end_date ? (
                            <>
                              {format(field.value.start_date, "LLL dd, y")} -{" "}
                              {format(field.value.end_date, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.start_date, "LLL dd, y")
                          )
                        ) : (
                          <span>Escolha um intervalo de data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        locale={ptBR}
                        selected={{
                          from: field.value.start_date,
                          to: field.value.end_date,
                        }}
                        onSelect={(range) => {
                          if (range?.from && range?.to)
                            form.setValue("range_date", {
                              start_date: range.from,
                              end_date: range.to,
                            });
                        }}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"dresses"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vestidos</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className={"block"}>
                        Selecionar vestidos
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent>
                      <ul>
                        {dresses.map((dress, index) => (
                          <>
                            {index > 0 && <Separator />}
                            <Separator />
                            <div
                              key={dress.id}
                              className={
                                "flex items-center border-gray-200 p-1"
                              }
                            >
                              <Image
                                src={dress.image}
                                alt={dress.description}
                                width={500}
                                height={500}
                                className={
                                  "mr-2 h-16 w-16 rounded-md object-cover"
                                }
                              />

                              <p className={"text-sm text-gray-800"}>
                                {dress.description}
                              </p>
                            </div>
                          </>
                        ))}
                      </ul>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
