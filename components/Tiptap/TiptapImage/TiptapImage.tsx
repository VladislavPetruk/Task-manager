import { useState } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { ImageIcon } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { toggleVariants } from '@/components/ui/toggle';
import type { Editor } from '@tiptap/react';

import { TiptapButton } from '../TiptapButton';

import { TiptapImageEdit } from './TiptapImageEdit';

interface TiptapImageProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

export const TiptapImage = ({ editor, size, variant }: TiptapImageProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TiptapButton
          isActive={editor.isActive('image')}
          tooltip="Image"
          aria-label="Image"
          size={size}
          variant={variant}
        >
          <ImageIcon className="size-5" />
        </TiptapButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-96">
        <DialogHeader>
          <DialogTitle>Select image</DialogTitle>
          <DialogDescription className="sr-only">
            Upload an image from your computer
          </DialogDescription>
        </DialogHeader>
        <TiptapImageEdit editor={editor} close={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
