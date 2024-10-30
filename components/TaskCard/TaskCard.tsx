import { CSSProperties } from 'react';
import { EllipsisVertical } from 'lucide-react';

import {
  GET_ACTIVE_TASKS_QUERY_KEY,
  GET_FUTURE_TASKS_QUERY_KEY,
} from '@/app/api/tasks';
import { useDeleteTask } from '@/app/api/tasks/[id]';
import { PRIORITY_COLORS, Task } from '@/constants/task';
import { cn } from '@/lib/utils';
import { useDialogsStore } from '@/stores/DialogsStore';
import { useQueryClient } from '@tanstack/react-query';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Loader } from '../ui/loader';

type TaskCardProps = Task;

export const TaskCard = (props: TaskCardProps) => {
  const task = props;
  const openDialog = useDialogsStore((state) => state.openDialog);

  const queryClient = useQueryClient();
  const color = PRIORITY_COLORS[task.priority];

  const { mutate, isPending } = useDeleteTask({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ACTIVE_TASKS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_FUTURE_TASKS_QUERY_KEY] });
    },
  });

  return (
    <Card
      x-chunk="dashboard-01-chunk-0"
      className={cn(
        `relative mb-4 h-max cursor-pointer overflow-hidden rounded-2xl bg-background before:absolute before:h-full before:w-1.5 before:bg-[var(--user-color)] before:content-['']`
      )}
      style={
        {
          '--user-color': color,
        } as CSSProperties
      }
      onDoubleClick={() => {
        openDialog(task.id, 'update');
      }}
    >
      {isPending && (
        <div className="absolute inset-0 grid place-content-center bg-gray-200/40">
          <Loader />
        </div>
      )}
      <CardHeader className="items-center justify-between pb-2">
        {task.tags.length > 0 && (
          <Badge variant={null}>{task.tags.toString()}</Badge>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="ml-auto">
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <EllipsisVertical />
              <span className="sr-only">Toggle card handler</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => openDialog(task.id, 'update')}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => mutate(task.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-1 text-2xl font-medium">
          {task.title}
        </CardTitle>
        <p className="text-muted-foreground">{task.description}</p>
      </CardContent>
    </Card>
  );
};
