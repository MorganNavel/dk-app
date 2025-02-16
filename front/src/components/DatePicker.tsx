"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useLocale, useTranslations } from "next-intl";
import { Matcher } from "react-day-picker";

function getFormatDate(locale: string) {
  switch (locale) {
    case "fr":
      return "dd/MM/yyyy";
    case "ko":
      return "yyyy/MM/dd";
    case "en":
      return "MM/dd/yyyy";
    default:
      return "MM/dd/yyyy";
  }
}

interface DateTimePickerProps {
  onChange?: (date: Date | undefined) => void;
  fromDate?: Date;
  disabledDays?: Matcher;
  disabled?: Matcher | Matcher[];
  initialDate?: Date;
}
interface DateTimePicker extends DateTimePickerProps {
  format?: "24h" | "12h";
}
export function DateTimePicker({
  onChange,
  format,
  ...props
}: Readonly<DateTimePicker>) {
  if (format === "12h") {
    return <DateTimePicker12h onChange={onChange} {...props} />;
  } else {
    return <DateTimePicker24h onChange={onChange} {...props} />;
  }
}

function DateTimePicker24h({
  onChange,
  initialDate,
  ...props
}: Readonly<DateTimePickerProps>) {
  const [date, setDate] = React.useState<Date>(initialDate ?? new Date());
  const [isOpen, setIsOpen] = React.useState(false);
  const t = useTranslations("generals.date-picker");
  const locale = useLocale();

  const hours = Array.from({ length: 24 }, (_, i) => i).reverse();
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    if (date) {
      const newDate = new Date(date);
      if (type === "hour") {
        newDate.setHours(parseInt(value));
      } else if (type === "minute") {
        newDate.setMinutes(parseInt(value));
      }
      setDate(newDate);
      onChange && onChange(newDate);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? (
            format(date, getFormatDate(locale) + " HH:mm")
          ) : (
            <span>
              <span>{t("placeholder")}</span>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <div className='sm:flex'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            {...props}
          />
          <div className='flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x'>
            <ScrollArea className='w-64 sm:w-auto'>
              <div className='flex sm:flex-col p-2'>
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    size='icon'
                    variant={
                      date && date.getHours() === hour ? "default" : "ghost"
                    }
                    className='sm:w-full shrink-0 aspect-square'
                    onClick={() => handleTimeChange("hour", hour.toString())}
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
                      date && date.getMinutes() === minute ? "default" : "ghost"
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
  );
}

function DateTimePicker12h({
  onChange,
  initialDate,
  ...props
}: Readonly<DateTimePickerProps>) {
  const [date, setDate] = React.useState<Date>(initialDate ?? new Date());
  const [isOpen, setIsOpen] = React.useState(false);
  const locale = useLocale();
  const t = useTranslations("generals.date-picker");

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (
    type: "hour" | "minute" | "ampm",
    value: string
  ) => {
    if (date) {
      const newDate = new Date(date);
      if (type === "hour") {
        newDate.setHours(
          (parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0)
        );
      } else if (type === "minute") {
        newDate.setMinutes(parseInt(value));
      } else if (type === "ampm") {
        const currentHours = newDate.getHours();
        newDate.setHours(
          value === "PM" ? currentHours + 12 : currentHours - 12
        );
      }
      setDate(newDate);
      onChange && onChange(newDate);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? (
            format(date, getFormatDate(locale) + " hh:mm aa")
          ) : (
            <span>{t("placeholder")}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <div className='sm:flex'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            {...props}
          />
          <div className='flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x'>
            <ScrollArea className='w-64 sm:w-auto'>
              <div className='flex sm:flex-col p-2'>
                {hours.reverse().map((hour) => (
                  <Button
                    key={hour}
                    size='icon'
                    variant={
                      date && date.getHours() % 12 === hour % 12
                        ? "default"
                        : "ghost"
                    }
                    className='sm:w-full shrink-0 aspect-square'
                    onClick={() => handleTimeChange("hour", hour.toString())}
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
                      date && date.getMinutes() === minute ? "default" : "ghost"
                    }
                    className='sm:w-full shrink-0 aspect-square'
                    onClick={() =>
                      handleTimeChange("minute", minute.toString())
                    }
                  >
                    {minute}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation='horizontal' className='sm:hidden' />
            </ScrollArea>
            <ScrollArea className=''>
              <div className='flex sm:flex-col p-2'>
                {["AM", "PM"].map((ampm) => (
                  <Button
                    key={ampm}
                    size='icon'
                    variant={
                      date &&
                      ((ampm === "AM" && date.getHours() < 12) ||
                        (ampm === "PM" && date.getHours() >= 12))
                        ? "default"
                        : "ghost"
                    }
                    className='sm:w-full shrink-0 aspect-square'
                    onClick={() => handleTimeChange("ampm", ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
