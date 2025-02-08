"use client";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { useTranslations } from "next-intl";
import React from "react";
import { Textarea } from "../ui/textarea";

interface ControlledTextareaProps<T extends FieldValues>
  extends React.ComponentProps<typeof Textarea> {
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

export const ControlledTextarea = <T extends FieldValues>({
  name,
  control,
  rules = {},
  label,
  required = false,
  onChange,
  className,
  ...props
}: ControlledTextareaProps<T>) => {
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
              <Textarea
                {...field}
                {...props}
                onBlur={field.onBlur}
                aria-describedby={`${name}-error`}
                aria-invalid={!!fieldState.error}
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
