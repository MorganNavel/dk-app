import { ControlledCaptchat } from "@/components/captcha/ControlledCaptcha";
import { ControlledInput } from "@/components/fields/ControlledInput";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { signIn } from "@/lib/auth-client";
import { Link, useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SignInScheme } from "./signin-schema";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function SignInForm() {
  const t = useTranslations();
  const schema = SignInScheme(t);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      credentials: {
        email: "",
        password: "",
      },
      token: "",
    },
  });
  async function onSubmit(data: z.infer<typeof schema>) {
    await signIn.email(
      {
        email: data.credentials.email,
        password: data.credentials.password,
      },
      {
        onSuccess: () => {
          toast.success(t("generals.signin.message.success"));
          methods.reset();
          router.push("/");
        },
        onError: (error) => {
          toast.error(t("generals.signin.message.error"));
          console.error(error);
        },
      }
    );
  }

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className=' px-4 py-6 rounded-lg flex flex-col gap-4'
      >
        <ControlledInput
          label={t("generals.user-profile.label.email")}
          name={"credentials.email"}
          placeholder={t("generals.user-profile.placeholder.email")}
          control={methods.control}
          required
        />
        <ControlledInput
          label={t("generals.user-profile.label.password")}
          name={"credentials.password"}
          placeholder={t("generals.user-profile.placeholder.password")}
          control={methods.control}
          type={showPassword ? "text" : "password"}
          labelInlineComponent={
            <Link href='#' className='ml-2 underline-offset-4 hover:underline'>
              {t("generals.forgotPassword")}
            </Link>
          }
          trailing={
            showPassword ? (
              <EyeOff
                size={18}
                onClick={() => setShowPassword((prev) => !prev)}
                className='cursor-pointer'
              />
            ) : (
              <Eye
                size={18}
                onClick={() => setShowPassword((prev) => !prev)}
                className='cursor-pointer'
              />
            )
          }
          required
        />
        <div className='flex justify-center my-5'>
          <ControlledCaptchat name='token' control={methods.control} />
        </div>

        <Button variant={"default"} type={"submit"} className='w-full'>
          {t("generals.submit")}
        </Button>
      </form>
    </Form>
  );
}
