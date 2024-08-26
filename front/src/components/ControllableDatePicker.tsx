import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";

export const ControllableDatePicker = ({
  name,
  label,
  value,
  required = false,
  onChange,
  rules = {},
  size = "medium",
  ...props
}: any) => {
  const t = useTranslations("generals");
  const today = dayjs();

  return (
    <Controller
      name={name}
      rules={{
        required: { value: required, message: t("requiredField") },
        ...rules,
      }}
      render={({ field: { onChange: fieldOnChange, value: fieldValue } }) => (
        <DatePicker
          value={fieldValue || value || today}
          label={label}
          minDate={today}
          onChange={(newValue) => {
            fieldOnChange(newValue);
            onChange && onChange(newValue);
          }}
          {...props}
        />
      )}
    />
  );
};
