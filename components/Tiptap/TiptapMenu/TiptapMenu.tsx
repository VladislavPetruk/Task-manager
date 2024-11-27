import { ReactNode, useCallback, useMemo } from 'react';
import type { VariantProps } from 'class-variance-authority';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { toggleVariants } from '@/components/ui/toggle';
import { cn } from '@/shared/lib/utils';
import { FormatAction } from '@/shared/types';
import { CaretDownIcon } from '@radix-ui/react-icons';
import type { Editor } from '@tiptap/react';

import { TiptapButton } from '../TiptapButton';

interface TiptapMenuProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
  actions: FormatAction[];
  activeActions?: string[];
  mainActionCount?: number;
  dropdownIcon?: ReactNode;
  dropdownTooltip?: string;
  dropdownClassName?: string;
}

export const TiptapMenu = ({
  editor,
  actions,
  activeActions = actions.map((action) => action.value),
  mainActionCount = 0,
  dropdownIcon,
  dropdownTooltip = 'More options',
  dropdownClassName = 'w-12',
  size,
  variant,
}: TiptapMenuProps) => {
  const { mainActions, dropdownActions } = useMemo(() => {
    const sortedActions = actions
      .filter((action) => activeActions.includes(action.value))
      .sort(
        (a, b) =>
          activeActions.indexOf(a.value) - activeActions.indexOf(b.value)
      );

    return {
      mainActions: sortedActions.slice(0, mainActionCount),
      dropdownActions: sortedActions.slice(mainActionCount),
    };
  }, [actions, activeActions, mainActionCount]);

  const renderToolbarButton = useCallback(
    (action: FormatAction) => (
      <TiptapButton
        key={action.label}
        onClick={() => action.action(editor)}
        disabled={!action.canExecute(editor)}
        isActive={action.isActive(editor)}
        tooltip={action.label}
        aria-label={action.label}
        size={size}
        variant={variant}
      >
        {action.icon}
      </TiptapButton>
    ),
    [editor, size, variant]
  );

  const renderDropdownMenuItem = useCallback(
    (action: FormatAction) => (
      <DropdownMenuItem
        key={action.label}
        onClick={() => action.action(editor)}
        disabled={!action.canExecute(editor)}
        className={cn('flex flex-row items-center justify-between gap-4', {
          'bg-accent': action.isActive(editor),
        })}
        aria-label={action.label}
      >
        <span className="grow">{action.label}</span>
        {/* <ShortcutKey keys={action.shortcuts} /> */}
      </DropdownMenuItem>
    ),
    [editor]
  );

  const isDropdownActive = useMemo(
    () => dropdownActions.some((action) => action.isActive(editor)),
    [dropdownActions, editor]
  );

  return (
    <>
      {mainActions.map(renderToolbarButton)}
      {dropdownActions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <TiptapButton
              isActive={isDropdownActive}
              tooltip={dropdownTooltip}
              aria-label={dropdownTooltip}
              className={cn(dropdownClassName)}
              size={size}
              variant={variant}
            >
              {dropdownIcon || <CaretDownIcon className="size-5" />}
            </TiptapButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-full">
            {dropdownActions.map(renderDropdownMenuItem)}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
