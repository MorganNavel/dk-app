import { toast } from "sonner";

export const errorToasts = (t: Function, error: ApiResponse<any>) => {
  switch (error.code) {
    case 401:
      toast.error(t("generals.error.unauthorized"));
      break;
    case 403:
      toast.error(t("generals.error.forbidden"));
      break;
    case 404:
      toast.error(t("generals.error.notFound"));
      break;
    case 500:
      toast.error(t("generals.error.unexpectedError"));
      break;
    default:
      toast.error(t("generals.error.unexpectedError"));
  }
};
