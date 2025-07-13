import { useTranslations } from "next-intl";
import { Form } from "@ui/form";
import { useForm } from "react-hook-form";
import { LessonScheme } from "@/scheme/lesson";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledInput } from "../fields/ControlledInput";
import { ControlledTextarea } from "../fields/ControlledTextarea";
import { Button } from "@ui/button";
import { toast } from "sonner";
import { createLessonAndRevalidate } from "@/app/[locale]/danbee-park/dashboard/actions";
import { startOfDay } from "date-fns";
import { DateTimePickerForm } from "@ui/date-picker-form";
import { ControlledMultiSelect } from "../fields/ControlledMultiSelect";
import LNGS from "@/types/languages";
interface FormProps {
  title: string;
  description: string;
  startDate: Date;
  duration: number;
  languages: string[];
}
interface LessonFormProps {
  onFinish: () => void;
}
export function LessonForm({ onFinish }: Readonly<LessonFormProps>) {
  const t = useTranslations();
  const methods = useForm<FormProps>({
    resolver: zodResolver(LessonScheme(t)),
    defaultValues: {
      title: "",
      description: "",
      startDate: new Date(),
      duration: 50,
      languages: [],
    },
  });
  async function handleSubmit(data: FormProps) {
    const r = await createLessonAndRevalidate(data);
    const text = t(r?.key) || "No message";
    if (r?.code === 0) {
      toast.success(text);
      onFinish();
    } else toast.error(text);
  }

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className='p-10 flex flex-col gap-5 overflow-auto'
      >
        <ControlledInput
          label={t("lessons.data-table.columns.title")}
          name='title'
          type='text'
          required
          control={methods.control}
          required
        />
        <ControlledTextarea
          label={t("generals.description")}
          name='description'
          control={methods.control}
        />
        <ControlledMultiSelect
          control={methods.control}
          name='languages'
          options={LNGS}
          label={t("generals.user-profile.label.lngs")}
          placeholder={t("generals.user-profile.placeholder.lngs")}
          required
        />
        <DateTimePickerForm
          label={t("lessons.data-table.columns.startDate")}
          name='startDate'
          control={methods.control}
          disabled={(date) => date < startOfDay(new Date())}
          required
        />
        <ControlledInput
          label={t("lessons.data-table.columns.duration")}
          name='duration'
          type='number'
          required
          control={methods.control}
          required
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
