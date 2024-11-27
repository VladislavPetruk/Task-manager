import { useCallback, useMemo } from 'react';
import type { VariantProps } from 'class-variance-authority';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toggleVariants } from '@/components/ui/toggle';
import { cn } from '@/shared/lib/utils';
import { FormatAction } from '@/shared/types';
import { CaretDownIcon, LetterCaseCapitalizeIcon } from '@radix-ui/react-icons';
import type { Level } from '@tiptap/extension-heading';
import type { Editor } from '@tiptap/react';

import { TiptapButton } from '../TiptapButton';

/* eslint-disable */

interface TextStyle
  extends Omit<
    FormatAction,
    'value' | 'icon' | 'action' | 'isActive' | 'canExecute'
  > {
  element: keyof JSX.IntrinsicElements;
  level?: Level;
  className: string;
}

const formatActions: TextStyle[] = [
  {
    label: 'Normal Text',
    element: 'span',
    className: 'grow',
    shortcuts: ['mod', 'alt', '0'],
  },
  {
    label: 'Heading 1',
    element: 'h1',
    level: 1,
    className: 'm-0 grow text-3xl font-extrabold',
    shortcuts: ['mod', 'alt', '1'],
  },
  {
    label: 'Heading 2',
    element: 'h2',
    level: 2,
    className: 'm-0 grow text-xl font-bold',
    shortcuts: ['mod', 'alt', '2'],
  },
  {
    label: 'Heading 3',
    element: 'h3',
    level: 3,
    className: 'm-0 grow text-lg font-semibold',
    shortcuts: ['mod', 'alt', '3'],
  },
  {
    label: 'Heading 4',
    element: 'h4',
    level: 4,
    className: 'm-0 grow text-base font-semibold',
    shortcuts: ['mod', 'alt', '4'],
  },
  {
    label: 'Heading 5',
    element: 'h5',
    level: 5,
    className: 'm-0 grow text-sm font-normal',
    shortcuts: ['mod', 'alt', '5'],
  },
  {
    label: 'Heading 6',
    element: 'h6',
    level: 6,
    className: 'm-0 grow text-sm font-normal',
    shortcuts: ['mod', 'alt', '6'],
  },
];

interface TiptapHeadingProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
  activeLevels?: Level[];
}

export const TiptapHeading = ({
  editor,
  activeLevels = [1, 2, 3, 4, 5, 6],
  size,
  variant,
}: TiptapHeadingProps) => {
  const filteredActions = useMemo(
    () =>
      formatActions.filter(
        (action) => !action.level || activeLevels.includes(action.level)
      ),
    [activeLevels]
  );

  const handleStyleChange = useCallback(
    (level?: Level) => {
      if (level) {
        editor.chain().focus().toggleHeading({ level }).run();
      } else {
        editor.chain().focus().setParagraph().run();
      }
    },
    [editor]
  );

  const renderMenuItem = useCallback(
    ({ label, element: Element, level, className }: TextStyle) => (
      <DropdownMenuItem
        key={label}
        onClick={() => handleStyleChange(level)}
        className={cn('flex flex-row items-center justify-between gap-4', {
          'bg-accent': level
            ? editor.isActive('heading', { level })
            : editor.isActive('paragraph'),
        })}
        aria-label={label}
      >
        <Element className={className}>{label}</Element>
      </DropdownMenuItem>
    ),
    [editor, handleStyleChange]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <TiptapButton
          isActive={editor.isActive('heading')}
          tooltip="Text styles"
          aria-label="Text styles"
          pressed={editor.isActive('heading')}
          className="w-10 gap-0"
          disabled={editor.isActive('codeBlock')}
          size={size}
          variant={variant}
        >
          <LetterCaseCapitalizeIcon className="size-5" />
          <CaretDownIcon className="size-5" />
        </TiptapButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-full">
        {filteredActions.map(renderMenuItem)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
