import { useTranslations } from "next-intl";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { LessonScheme } from "@/scheme/lesson";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledInput } from "../fields/ControlledInput";
import { ControlledTextarea } from "../fields/ControlledTextarea";
import { ControlledDatePicker } from "../fields/ControlledDatePicker";
import { Button } from "react-day-picker";
import { apiCall } from "@/utils/apiCall";
import { useQueryClient } from "@tanstack/react-query";
interface FormProps {
  title: string;
  description: string;
  startDate: string;
  duration: string;
}
interface LessonFormProps {
  onSubmit: () => void;
}

export function LessonForm({ onSubmit }: Readonly<LessonFormProps>) {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const methods = useForm<FormProps>({
    resolver: zodResolver(LessonScheme(t)),
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      duration: "",
    },
  });
  async function handleSubmit(data: FormProps) {
    try {
      await apiCall("/lesson", "POST", data);
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      onSubmit();
    } catch {
      onSubmit();
    }
  }
  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <ControlledInput
          label={t("lessons.data-table.columns.title")}
          name='title'
          type='text'
          control={methods.control}
        />
        <ControlledTextarea
          label={t("lessons.data-table.columns.description")}
          name='description'
          control={methods.control}
        />
        <ControlledDatePicker
          name='startDate'
          control={methods.control}
          format='24h'
          label={t("lessons.data-table.columns.startDate")}
        />
        <Button type='submit'>{t("save")}</Button>
      </form>
    </Form>
  );
}
