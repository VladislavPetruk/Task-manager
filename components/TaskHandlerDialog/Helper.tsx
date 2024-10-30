import {
  PRIORITY_COLORS,
  STATUS_OPTIONS,
  TaskPriority,
  TaskStatus,
} from '@/constants/task';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';

/* eslint-disable */

interface PrioritySelectProps {
  value: TaskPriority;
  disabled?: boolean;
  onChange: (value: TaskPriority) => void;
}

interface StatusSelectProps {
  value: TaskStatus;
  disabled?: boolean;
  onChange: (value: TaskStatus) => void; //
}

export const PrioritySelect = ({
  value,
  onChange,
  disabled,
}: PrioritySelectProps) => (
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
              className={`h-4 w-4 rounded-full`}
              style={{ backgroundColor: color }}
            ></div>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </div>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

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
