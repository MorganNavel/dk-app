import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { useTranslations } from "next-intl";
interface ControllableInputProps {
  name: string;
  label: string;
  defaultValue?: string;
  rules?: any;
  type?: string;
  variant?: "standard" | "outlined" | "filled";
  required?: boolean;
  fullWidth?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

export const ControllableInput = ({
  name,
  label,
  value,
  rules = {},
  required = false,
  onChange,
  size = "medium",
  className,
  ...props
}: ControllableInputProps) => {
  const t = useTranslations("generals");
  return (
    <Controller
      name={name}
      rules={{
        required: { value: required, message: t("requiredField") },
        ...rules,
      }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          value={value}
          error={!!fieldState.error}
          className={className}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange && onChange(e);
            field.onChange(e);
          }}
          helperText={fieldState.error ? fieldState.error.message : ""}
          {...props}
        />
      )}
    />
  );
};
