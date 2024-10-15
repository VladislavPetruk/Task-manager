import { CSSProperties } from 'react';
import { EllipsisVertical } from 'lucide-react';

import {
  GET_ACTIVE_TASKS_QUERY_KEY,
  GET_FUTURE_TASKS_QUERY_KEY,
} from '@/app/api/tasks';
import { useDeleteTask } from '@/app/api/tasks/[id]';
import { PRIORITY_COLORS, TASK_TYPE } from '@/constants/task';
import { cn } from '@/lib/utils';
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

interface TaskCardProps {
  task: TASK_TYPE;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const queryClient = useQueryClient();
  const color = PRIORITY_COLORS[task.priority];

  const { mutate } = useDeleteTask({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ACTIVE_TASKS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_FUTURE_TASKS_QUERY_KEY] });
    },
  });

  return (
    <Card
      x-chunk="dashboard-01-chunk-0"
      className={cn(
        `relative h-max overflow-hidden rounded-2xl before:absolute before:h-full before:w-1.5 before:bg-[var(--user-color)] before:content-['']`
      )}
      style={
        {
          '--user-color': color,
        } as CSSProperties
      }
      // data-swapy-item={task.id}
    >
      <CardHeader className="items-center justify-between pb-2">
        <Badge variant={null}>{task.tag}</Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <EllipsisVertical />
              <span className="sr-only">Toggle card handler</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Button onClick={() => mutate(task.id)}>Delete</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
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
