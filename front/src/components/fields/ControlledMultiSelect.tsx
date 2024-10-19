import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { MultiSelect } from "../ui/multi-select";

interface Option {
  label: string;
  value: string;
}

interface ControlledMultiSelectProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  options: Option[];
  rules?: Omit<
    RegisterOptions<T>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  onValueChange?: (values: string[]) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  size?: string;
}

export const ControlledMultiSelect = <T extends FieldValues>({
  name,
  control,
  options,
  rules = {},
  onValueChange,
  label,
  placeholder,
  size = "md",
  ...props
}: ControlledMultiSelectProps<T>) => {
  return (
    <FormField
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormItem>
          <>
            <FormLabel>{label}</FormLabel>

            <FormControl>
              <>
                <MultiSelect
                  options={options}
                  onValueChange={(values) => {
                    field.onChange(values);
                    onValueChange && onValueChange(values);
                  }}
                  placeholder={placeholder}
                  variant="default"
                  animation={2}
                  maxCount={5}
                  {...field}
                  {...props}
                />

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
