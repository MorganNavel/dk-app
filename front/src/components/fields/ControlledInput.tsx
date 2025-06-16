"use client";
import { Input } from "../ui/input";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { useTranslations } from "next-intl";
import React from "react";

interface ControlledInputProps<T extends FieldValues>
  extends React.ComponentProps<typeof Input> {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<T>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  onChange?: (value: any) => void;
  label: string;
  required?: boolean;
  trailing?: React.ReactNode;
  heading?: React.ReactNode;
  labelInlineComponent?: React.ReactNode;
}

export const ControlledInput = <T extends FieldValues>({
  name,
  control,
  rules = {},
  label,
  required = false,
  onChange,
  className,
  trailing,
  heading,
  labelInlineComponent,
  ...props
}: ControlledInputProps<T>) => {
  const t = useTranslations("generals");

  return (
    <FormField
      name={name}
      control={control}
      rules={{
        required: { value: required, message: t("requiredField") },
        validate: (value) => {
          if (required && !value.trim()) {
            return t("requiredField");
          }
          return true;
        },
        ...rules,
      }}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          <div className='flex items-center'>
            <FormLabel>
              {label}
              {required && <span className='text-red-500'> *</span>}
            </FormLabel>
            {labelInlineComponent && (
              <span className='ml-auto inline-block text-sm text-foreground'>
                {labelInlineComponent}
              </span>
            )}
          </div>
          <FormControl>
            <>
              <div className='relative'>
                <span className='absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground'>
                  {heading}
                </span>
                <Input
                  {...field}
                  {...props}
                  aria-invalid={!!fieldState.error}
                  aria-describedby={`${name}-error`}
                  onBlur={field.onBlur}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    onChange && onChange(e.target.value);
                  }}
                />
                <span className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground'>
                  {trailing}
                </span>
              </div>

              {fieldState.error && (
                <span
                  id={`${name}-error`}
                  className='text-red-500 text-xs mt-1'
                >
                  {fieldState.error.message}
                </span>
              )}
            </>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
