"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
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
  jewelry,
  purses,
} from "@/app/(private)/reservas/cadastrar/components/mocks";
import { SelectMultipleInput } from "@/app/(private)/reservas/cadastrar/components/components/select-multiple-input";
import { Textarea } from "@/components/ui/textarea";

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
      dresses: [],
      purses: [],
      jewelry: [],
    },
  });

  async function onSubmit(data: z.infer<typeof createBookingSchema>) {
    try {
      // await createBooking(data);
      router.back();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
          <div className={"grid gap-3 lg:grid-cols-2 lg:gap-4"}>
            <SelectWithAdd
              control={form.control}
              name={"customer"}
              label={"Selecionar Cliente"}
              placeholder={"Selecione um cliente"}
              options={clients}
              addActionLink={"/clientes/cadastrar"}
              addActionMessage={"Criar cliente"}
            />

            <SelectWithAdd
              control={form.control}
              name={"event"}
              label={"Evento"}
              placeholder={"Selecione um evento"}
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
                            "flex w-full justify-start text-left font-normal",
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

            <SelectMultipleInput
              label={"Selecionar vestidos"}
              triggerText={"Adicionar vestidos"}
              form={form}
              fieldName={"dresses"}
              options={dresses}
            />

            <SelectMultipleInput
              label={"Selecionar bolsas"}
              triggerText={"Adicionar bolsas"}
              form={form}
              fieldName={"purses"}
              options={purses}
            />

            <SelectMultipleInput
              label={"Selecionar jóias"}
              triggerText={"Adicionar jóias"}
              form={form}
              fieldName={"jewelry"}
              options={jewelry}
            />
          </div>

          <FormField
            control={form.control}
            name={"notes"}
            render={({ field }) => (
              <FormItem className={"space-y-1"}>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea rows={6} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DevTool control={form.control} />
    </>
  );
}
