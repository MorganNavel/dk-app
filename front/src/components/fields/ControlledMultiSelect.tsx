import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { MultiSelect } from "../ui/multi-select";
import { useTranslations } from "next-intl";

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
  required?: boolean;
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
  required = false,
  ...props
}: ControlledMultiSelectProps<T>) => {
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
        <FormItem>
          <>
            <FormLabel>
              {label}
              {required && <span className='text-red-500'> *</span>}
            </FormLabel>

            <FormControl>
              <>
                <MultiSelect
                  options={options}
                  onValueChange={(values) => {
                    field.onChange(values);
                    onValueChange && onValueChange(values);
                  }}
                  placeholder={placeholder}
                  variant='default'
                  animation={2}
                  maxCount={5}
                  {...field}
                  {...props}
                  asChild
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
          </>
        </FormItem>
      )}
    />
  );
};
