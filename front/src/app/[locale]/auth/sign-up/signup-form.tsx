import { ControlledCaptchat } from "@/components/captcha/ControlledCaptcha";
import { ControlledInput } from "@/components/fields/ControlledInput";
import { ControlledMultiSelect } from "@/components/fields/ControlledMultiSelect";
import { Form } from "@/components/ui/form";
import LNGS from "@/types/languages";
import { SignUpScheme } from "./signup-scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations();
  const schema = SignUpScheme(t);
  type FormSchema = z.infer<typeof schema>;
  const methods = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      credentials: {
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        languages: [],
      },
      token: "",
    },
  });
  const router = useRouter();

  async function onSubmit(data: FormSchema) {
    await signUp.email(
      {
        email: data.credentials?.email,
        name: data.credentials?.name,
        password: data.credentials?.password,
      },
      {
        onSuccess: () => {
          toast.success(t("signin.message.success"));
          methods.reset();
          router.push("/");
        },
        onError: (error: any) => {
          toast.error(t("signup.message.error"));
        },
      }
    );
  }
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className=' px-4 py-6 rounded-lg gap-4 flex flex-col'
      >
        <ControlledInput
          label={t("generals.user-profile.label.email")}
          name={"credentials.email"}
          placeholder={t("generals.user-profile.placeholder.email")}
          control={methods.control}
          required
        />

        <ControlledInput
          label={t("generals.user-profile.label.name")}
          name={"credentials.name"}
          placeholder={t("generals.user-profile.placeholder.name")}
          control={methods.control}
          required
        />
        <ControlledInput
          label={t("generals.user-profile.label.password")}
          name={"credentials.password"}
          placeholder={t("generals.user-profile.placeholder.password")}
          control={methods.control}
          type={showPassword ? "text" : "password"}
          trailing={
            showPassword ? (
              <EyeOff
                size={18}
                onClick={handleTogglePasswordVisibility}
                className='cursor-pointer'
              />
            ) : (
              <Eye
                size={18}
                onClick={handleTogglePasswordVisibility}
                className='cursor-pointer'
              />
            )
          }
          required
        />
        <ControlledInput
          label={t("generals.user-profile.label.confirmPassword")}
          name={"credentials.confirmPassword"}
          placeholder={t("generals.user-profile.placeholder.confirmPassword")}
          control={methods.control}
          type={showPassword ? "text" : "password"}
          trailing={
            showPassword ? (
              <EyeOff
                size={18}
                onClick={handleTogglePasswordVisibility}
                className='cursor-pointer'
              />
            ) : (
              <Eye
                size={18}
                onClick={handleTogglePasswordVisibility}
                className='cursor-pointer'
              />
            )
          }
          required
        />

        <ControlledMultiSelect
          control={methods.control}
          name='credentials.languages'
          options={LNGS}
          label={t("generals.user-profile.label.lngs")}
          placeholder={t("generals.user-profile.placeholder.lngs")}
          required
        />
        <div className='flex justify-center'>
          <ControlledCaptchat name='token' control={methods.control} />
        </div>

        <Button variant={"default"} type={"submit"} className='w-full'>
          {t("generals.submit")}
        </Button>
      </form>
    </Form>
  );
}
