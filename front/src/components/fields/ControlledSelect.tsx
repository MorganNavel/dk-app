"use client";

import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTranslations } from "next-intl";

interface Option {
  label: string;
  value: string;
}

interface ControlledSelectProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  options: Option[];
  rules?: Omit<
    RegisterOptions<T>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  onChange?: (val: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  itemClassName?: string;
  size?: string;
  required?: boolean;
}

export const ControlledSelect = <T extends FieldValues>({
  name,
  control,
  options,
  rules = {},
  onChange,
  label,
  placeholder,
  itemClassName,
  required = false,
  size = "md",
  className,
  ...props
}: ControlledSelectProps<T>) => {
  const t = useTranslations("generals");
  return (
    <FormField
      name={name}
      control={control}
      rules={{
        required: { value: required, message: t("requiredField") },
        ...rules,
      }}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && <span className="text-red-500"> *</span>}
          </FormLabel>
          <FormControl>
            <>
              <Select
                {...props}
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  onChange && onChange(value);
                }}
                aria-invalid={!!fieldState.error}
                aria-describedby={`${name}-error`}
                aria-label={name}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className={itemClassName}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.error && (
                <span
                  id={`${name}-error`}
                  className="text-red-500 text-xs mt-1"
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
