"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Controller, Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type DateTimePickerFormProps = {
  name: string;
  label?: string;
  description?: string;
  disabled?: Date | ((date: Date) => boolean);
  control: Control<any>;
  required?: boolean;
};

export function DateTimePickerForm({
  name,
  label,
  description,
  disabled,
  control,
  required = false,
}: Readonly<DateTimePickerFormProps>) {
  const handleDateChange = (
    date: Date | undefined,
    current: Date | undefined,
    onChange: (d: Date) => void
  ) => {
    if (!date) return;
    const updated = new Date(current ?? date);
    updated.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    onChange(updated);
  };

  const handleTimeChange = (
    type: "hour" | "minute",
    value: string,
    current: Date | undefined,
    onChange: (d: Date) => void
  ) => {
    const newDate = new Date(current ?? new Date());
    if (type === "hour") newDate.setHours(+value);
    else newDate.setMinutes(+value);
    onChange(newDate);
  };

  return (
    <FormItem className='flex flex-col'>
      {label && required && (
        <FormLabel>
          {" "}
          {label} <span className='text-red-500'>*</span>{" "}
        </FormLabel>
      )}
      {label && !required && <FormLabel>{label}</FormLabel>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover modal>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? format(field.value, "dd/MM/yyyy HH:mm")
                    : "DD/MM/YYYY HH:mm"}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <div className='sm:flex'>
                <Calendar
                  mode='single'
                  selected={field.value}
                  onSelect={(d) =>
                    handleDateChange(d, field.value, field.onChange)
                  }
                  disabled={disabled}
                  initialFocus
                />
                <div className='flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x'>
                  <ScrollArea className='w-64 sm:w-auto'>
                    <div className='flex sm:flex-col p-2'>
                      {Array.from({ length: 24 }, (_, i) => i)
                        .reverse()
                        .map((hour) => (
                          <Button
                            key={hour}
                            size='icon'
                            variant={
                              field.value?.getHours() === hour
                                ? "default"
                                : "ghost"
                            }
                            className='sm:w-full shrink-0 aspect-square'
                            onClick={() =>
                              handleTimeChange(
                                "hour",
                                hour.toString(),
                                field.value,
                                field.onChange
                              )
                            }
                          >
                            {hour}
                          </Button>
                        ))}
                    </div>
                    <ScrollBar orientation='horizontal' className='sm:hidden' />
                  </ScrollArea>
                  <ScrollArea className='w-64 sm:w-auto'>
                    <div className='flex sm:flex-col p-2'>
                      {Array.from({ length: 12 }, (_, i) => i * 5).map(
                        (minute) => (
                          <Button
                            key={minute}
                            size='icon'
                            variant={
                              field.value?.getMinutes() === minute
                                ? "default"
                                : "ghost"
                            }
                            className='sm:w-full shrink-0 aspect-square'
                            onClick={() =>
                              handleTimeChange(
                                "minute",
                                minute.toString(),
                                field.value,
                                field.onChange
                              )
                            }
                          >
                            {minute.toString().padStart(2, "0")}
                          </Button>
                        )
                      )}
                    </div>
                    <ScrollBar orientation='horizontal' className='sm:hidden' />
                  </ScrollArea>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      />
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}
