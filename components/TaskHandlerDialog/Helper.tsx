import { useState } from 'react';
import { Check, X } from 'lucide-react';

import {
  PRIORITY_COLORS,
  STATUS_OPTIONS,
  TAGS_OPTIONS,
  TaskPriority,
  TaskStatus,
} from '@/constants/task';
import { CaretSortIcon } from '@radix-ui/react-icons';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

/* eslint-disable */

interface PrioritySelectProps {
  value: TaskPriority;
  disabled?: boolean;
  onChange: (value: TaskPriority) => void;
}

interface StatusSelectProps {
  value: TaskStatus;
  disabled?: boolean;
  onChange: (value: TaskStatus) => void;
}

interface TagsSelectProps {
  tags: Array<string>;
  disabled: boolean;
  onChange: (tags: Array<string>) => void;
}

export const PrioritySelect = ({
  value,
  onChange,
  disabled,
}: PrioritySelectProps) => {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder="Select a task priority" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(PRIORITY_COLORS).map(([key, color]) => (
          <SelectItem
            key={key}
            value={key as TaskPriority}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: color }}
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const StatusSelect = ({
  value,
  onChange,
  disabled,
}: StatusSelectProps) => (
  <Select value={value} onValueChange={onChange} disabled={disabled}>
    <SelectTrigger>
      <SelectValue placeholder="Select a task status" />
    </SelectTrigger>
    <SelectContent>
      {STATUS_OPTIONS.map(({ value, label }) => (
        <SelectItem key={value} value={value}>
          <div className="flex items-center gap-3">{label}</div>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export const MultipleSelector = ({ tags, disabled, onChange }: TagsSelectProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleSetValue = (tag: string) => {
    const newValues = tags.includes(tag)
      ? tags.filter((t) => t !== tag)
      : [...tags, tag];

    onChange(newValues);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="tags-button h-auto w-full justify-between overflow-hidden px-3 hover:bg-transparent disabled:cursor-not-allowed"
        >
          <div className="flex max-w-full flex-wrap gap-2">
            {tags?.length
              ? tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="hide-hover cursor-auto gap-x-1 px-1.5 capitalize text-white"
                    style={{
                      backgroundColor: TAGS_OPTIONS.find((t) => t.value === tag)
                        ?.color,
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    {TAGS_OPTIONS.find((t) => t.value === tag)?.value}
                    <button
                      className="group shrink-0 rounded-full hover:opacity-70"
                      onClick={() => handleSetValue(tag)}
                    >
                      <X className="size-3 stroke-current" />
                    </button>
                  </Badge>
                ))
              : 'Select tags...'}
          </div>
          <CaretSortIcon className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[450px] p-0">
        <Command>
          <CommandInput placeholder="Search tag..." />
          <CommandEmpty>No tag found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {TAGS_OPTIONS.map((tag) => (
                <CommandItem
                  key={tag.value}
                  value={tag.value}
                  onSelect={() => {
                    handleSetValue(tag.value);
                  }}
                  className="grid cursor-pointer grid-cols-[16px_1fr_16px] gap-x-3 capitalize"
                >
                  <div
                    className="h-4 rounded-full"
                    style={{ backgroundColor: tag.color }}
                  />
                  {tag.value}
                  {tags.includes(tag.value) && <Check />}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
