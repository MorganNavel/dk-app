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
}

export const ControlledInput = <T extends FieldValues>({
  name,
  control,
  rules = {},
  label,
  required = false,
  onChange,
  className,
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
          <FormLabel>
            {label}
            {required && <span className='text-red-500'> *</span>}
          </FormLabel>
          <FormControl>
            <>
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
