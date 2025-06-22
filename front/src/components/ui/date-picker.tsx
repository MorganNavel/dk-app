"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type DateTimePickerProps = {
  label?: string;
  description?: string;
  disabled?: Date | ((date: Date) => boolean);
  value: Date | undefined;
  onChange: (date: Date) => void;
};

export function DateTimePicker({
  label,
  description,
  disabled,
  value,
  onChange,
}: DateTimePickerProps) {
  const [internalDate, setInternalDate] = useState<Date | undefined>(value);

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    const updated = new Date(internalDate ?? date);
    updated.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    setInternalDate(updated);
    onChange(updated);
  };

  const handleTimeChange = (type: "hour" | "minute", val: string) => {
    const current = internalDate ?? new Date();
    const updated = new Date(current);
    if (type === "hour") updated.setHours(+val);
    else updated.setMinutes(+val);
    setInternalDate(updated);
    onChange(updated);
  };

  return (
    <div className='flex flex-col space-y-1.5'>
      {label && <label className='text-sm font-medium'>{label}</label>}
      <Popover modal>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            {value ? format(value, "dd/MM/yyyy HH:mm") : "DD/MM/YYYY HH:mm"}
            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <div className='sm:flex'>
            <Calendar
              mode='single'
              selected={value}
              onSelect={handleDateChange}
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
                          value?.getHours() === hour ? "default" : "ghost"
                        }
                        className='sm:w-full shrink-0 aspect-square'
                        onClick={() =>
                          handleTimeChange("hour", hour.toString())
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
                  {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                    <Button
                      key={minute}
                      size='icon'
                      variant={
                        value?.getMinutes() === minute ? "default" : "ghost"
                      }
                      className='sm:w-full shrink-0 aspect-square'
                      onClick={() =>
                        handleTimeChange("minute", minute.toString())
                      }
                    >
                      {minute.toString().padStart(2, "0")}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation='horizontal' className='sm:hidden' />
              </ScrollArea>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {description && (
        <p className='text-sm text-muted-foreground'>{description}</p>
      )}
    </div>
  );
}
