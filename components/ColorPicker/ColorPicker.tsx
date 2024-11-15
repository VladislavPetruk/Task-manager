/* eslint-disable */

import { useState } from 'react';

import { COLOR_PICKER_PALLETE } from '@/constants/colors';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface ColorPickerProps {
  background: string;
  className?: string;
  setBackground: (background: string) => void;
  onClose: () => void;
}

export function ColorPicker({
  background,
  className,
  setBackground,
  onClose,
}: ColorPickerProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Popover
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        if (open) {
          onClose();
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'h-6 w-6 rounded-full border-none p-0',
            !background && 'text-muted-foreground',
            className
          )}
          style={{ background }}
        ></Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div
          className="mb-4 h-20 w-full"
          style={{ backgroundColor: background }}
        ></div>
        <div className="flex flex-wrap gap-2">
          {COLOR_PICKER_PALLETE.map((color) => (
            <div
              key={color}
              style={{ background: color }}
              className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
              onClick={() => setBackground(color)}
            />
          ))}
        </div>

        <Input
          id="color"
          value={background}
          className="col-span-2 mt-4 h-8"
          onChange={(e) => setBackground(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  );
}
