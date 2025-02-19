import { useTranslations } from "next-intl";
import { Form } from "@ui/form";
import { useForm } from "react-hook-form";
import { LessonScheme } from "@/scheme/lesson";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledInput } from "../fields/ControlledInput";
import { ControlledTextarea } from "../fields/ControlledTextarea";
import { ControlledDatePicker } from "../fields/ControlledDatePicker";
import { apiCall } from "@/utils/apiCall";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@ui/button";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";
import { errorToasts } from "@/utils/toast";
interface FormProps {
  title: string;
  description: string;
  startDate: Date;
  duration: number;
}
interface LessonFormProps {
  onFinish: () => void;
}
export function LessonForm({ onFinish }: Readonly<LessonFormProps>) {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const methods = useForm<FormProps>({
    resolver: zodResolver(LessonScheme(t)),
    defaultValues: {
      title: "",
      description: "",
      startDate: new Date(),
      duration: 50,
    },
  });
  async function handleSubmit(data: FormProps) {
    try {
      await apiCall("/lesson", "POST", data);
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      toast.success(t("lesson.create.success"));
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        const err: ApiResponse<any> = JSON.parse(e.message);
        errorToasts(t, err);
      }
    }
    onFinish();
  }

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className='p-10'>
        <ControlledInput
          label={t("lessons.data-table.columns.title")}
          name='title'
          type='text'
          required
          control={methods.control}
        />
        <ControlledTextarea
          label={t("generals.description")}
          name='description'
          control={methods.control}
        />
        <ControlledDatePicker
          name='startDate'
          control={methods.control}
          format='24h'
          required
          label={t("lessons.data-table.columns.startDate")}
        />
        <ControlledInput
          label={t("lessons.data-table.columns.duration")}
          name='duration'
          type='number'
          required
          control={methods.control}
          disabled
        />

        <div className='flex flex-col gap-3 mt-5 mx-5'>
          <Button className='w-full' variant={"outline"} onClick={onFinish}>
            {t("generals.cancel")}
          </Button>
          <Button
            type='submit'
            className='w-full'
            disabled={methods.formState.isSubmitting}
          >
            {t("generals.submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
