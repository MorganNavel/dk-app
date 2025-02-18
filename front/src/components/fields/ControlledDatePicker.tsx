import { useTranslations } from "next-intl";
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { DateTimePicker } from "@/components/DatePicker";

interface ControlledDatePickerProps<T extends FieldValues>
  extends React.ComponentProps<typeof DateTimePicker> {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<T>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  onChange?: (date: Date | undefined) => void;
  label: string;
  required?: boolean;
  className?: string;
}
export const ControlledDatePicker = <T extends FieldValues>({
  name,
  control,
  rules = {},
  label,
  required = false,
  onChange,
  className,
  ...props
}: ControlledDatePickerProps<T>) => {
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
              <DateTimePicker
                {...field}
                {...props}
                onChange={(date) => {
                  field.onChange(date);
                  onChange && onChange(date);
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
