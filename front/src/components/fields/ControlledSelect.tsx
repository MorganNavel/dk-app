import { Select, SelectItem } from "@nextui-org/react";
import { FormControl, FormField, FormItem } from "../ui/form";
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

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
  size = "md",
  ...props
}: ControlledSelectProps<T>) => {
  return (
    <FormField
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormItem>
          <>
            <FormControl>
              <>
                <Select
                  {...field}
                  {...props}
                  placeholder={placeholder}
                  selectionMode="multiple"
                  onChange={(e) => {
                    field.onChange(e);
                    const value = e.target.value;
                    onChange && onChange(value);
                  }}
                  aria-invalid={!!fieldState.error}
                  aria-describedby={`${name}-error`}
                  aria-label={name}
                >
                  {options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className={itemClassName}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
                {fieldState.error && (
                  <span id={`${name}-error`} className="text-red-500">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            </FormControl>
          </>
        </FormItem>
      )}
    />
  );
};
