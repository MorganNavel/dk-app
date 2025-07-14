import { Control, FieldPath, FieldValues } from "react-hook-form";
import { FormField, FormItem } from "../ui/form";
import { Captcha } from "./Captcha";
import { useTranslations } from "next-intl";

interface ControlledCaptchatProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
}
export function ControlledCaptchat<T extends FieldValues>({
  name,
  control,
}: Readonly<ControlledCaptchatProps<T>>) {
  const t = useTranslations();
  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem>
          <Captcha onChange={(token) => field.onChange(token ?? "")} />
          {fieldState.error && (
            <span id={`${name}-error`} className='text-red-500 text-xs mt-1'>
              {t(fieldState.error.message)}
            </span>
          )}
        </FormItem>
      )}
    />
  );
}
