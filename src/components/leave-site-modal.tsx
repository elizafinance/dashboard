'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";

interface LeaveSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  siteName: string;
}

export function LeaveSiteModal({ isOpen, onClose, onConfirm, siteName }: LeaveSiteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[var(--ocean-dark)]">Leaving Eliza.Finance</DialogTitle>
          <DialogDescription className="text-[var(--ocean-dark)]/70">
            You're about to visit {siteName}. Are you sure you want to leave Eliza.Finance?
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 justify-end mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[var(--ocean-light)] text-[var(--ocean-dark)]"
          >
            Stay Here 🏖️
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-[var(--ocean-dark)] text-white hover:bg-[var(--ocean-light)]"
          >
            Let's Go 🏄‍♂️
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 