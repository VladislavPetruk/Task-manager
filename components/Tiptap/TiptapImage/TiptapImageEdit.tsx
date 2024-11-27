import { ChangeEvent, useCallback, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { fileToBase64 } from '@/shared/functions/fileToBase64';
import type { Editor } from '@tiptap/react';

interface TiptapImageEditProps {
  editor: Editor;
  close: () => void;
}

export const TiptapImageEdit = ({ editor, close }: TiptapImageEditProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files?.length) return;

      const insertImages = async () => {
        const contentBucket = [];
        const filesArray = Array.from(files);

        for (const file of filesArray) {
          contentBucket.push({ src: await fileToBase64(file) });
        }

        contentBucket.map((content) => editor.commands.setImage(content));
      };

      await insertImages();
      close();
    },
    [editor, close]
  );

  return (
    <div className="space-y-6">
      <Button type="button" className="w-full" onClick={handleClick}>
        Upload from your computer
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        multiple
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
};
