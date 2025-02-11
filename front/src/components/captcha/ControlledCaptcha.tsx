import { Control, FieldPath, FieldValues } from "react-hook-form";
import { FormField, FormItem } from "../ui/form";
import { Captcha } from "./Captcha";

interface ControlledCaptchatProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
}
export function ControlledCaptchat<T extends FieldValues>({
  name,
  control,
}: ControlledCaptchatProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem>
          <Captcha onChange={(token) => field.onChange(token ?? "")} />
          {fieldState.error && (
            <span id={`${name}-error`} className="text-red-500 text-xs mt-1">
              {fieldState.error.message}
            </span>
          )}
        </FormItem>
      )}
    />
  );
}
