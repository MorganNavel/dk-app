import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  children?: ReactNode;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  children,
}: Readonly<ConfirmDialogProps>) {
  const t = useTranslations("generals");

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-lg font-semibold'>
            {title || <Skeleton className='h-6 w-1/2' />}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className='text-gray-600'>
          {description || <Skeleton className='h-6 w-2/3' />}
        </DialogDescription>
        {children}
        <DialogFooter className='flex justify-end gap-2'>
          <DialogClose asChild>
            <Button variant='outline'>
                {t("cancel")}
            </Button>
          </DialogClose>
          <DialogClose asChild onClick={onConfirm}>
            <Button>
              {t("confirm")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
