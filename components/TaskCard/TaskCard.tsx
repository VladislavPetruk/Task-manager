import { CSSProperties } from 'react';
import { EllipsisVertical } from 'lucide-react';

import { useDeleteTask, useUpdateTask } from '@/app/api/hooks/mutations';
import {
  GET_ACTIVE_TASKS_QUERY_KEY,
  GET_FUTURE_TASKS_QUERY_KEY,
} from '@/app/api/hooks/queries';
import { DialogType } from '@/constants/other';
import {
  PRIORITY_COLORS,
  TAGS_OPTIONS,
  Task,
  TaskStage,
} from '@/constants/task';
import { toast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';
import { useDialogsStore } from '@/stores';
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

  const { mutate: mutateDeleteTask, isPending: inPendingDeleteTask } =
    useDeleteTask({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [GET_ACTIVE_TASKS_QUERY_KEY],
        });
        queryClient.invalidateQueries({
          queryKey: [GET_FUTURE_TASKS_QUERY_KEY],
        });
        toast({
          title: 'Task successfully deleted',
          variant: 'success',
        });
      },
    });

  const { mutate: mutateUpdateTask, isPending: inPendingMutateTask } =
    useUpdateTask({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [GET_ACTIVE_TASKS_QUERY_KEY],
        });
        queryClient.invalidateQueries({
          queryKey: [GET_FUTURE_TASKS_QUERY_KEY],
        });
        toast({
          title: 'Task successfully updated',
          variant: 'success',
        });
      },
      onError: (error) => {
        toast({
          title: error.message || 'Something went wrong',
          variant: 'destructive',
        });
      },
    });

  const onUpdateTask = async (stage: TaskStage) => {
    const updatedTask = {
      ...task,
      currentStage: stage,
    };

    mutateUpdateTask(updatedTask);
  };

  return (
    <Card
      x-chunk="dashboard-01-chunk-0"
      className={cn(
        `relative h-max cursor-grab overflow-hidden rounded-2xl bg-background before:absolute before:h-full before:w-1.5 before:bg-[var(--user-color)] before:content-['']`
      )}
      style={
        {
          '--user-color': color,
        } as CSSProperties
      }
      onDoubleClick={() => {
        openDialog(task.id, DialogType.UPDATE, task.currentStage);
      }}
    >
      {(inPendingMutateTask || inPendingDeleteTask) && (
        <div className="absolute inset-0 grid place-content-center bg-accent/50">
          <Loader />
        </div>
      )}
      <CardHeader className="items-center justify-between gap-x-3 pb-2">
        {task.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1">
            {task.tags.map((tag) => (
              <Badge
                key={tag}
                className="gap-x-1 px-1.5 capitalize text-white"
                style={{
                  backgroundColor: TAGS_OPTIONS.find((t) => t.value === tag)
                    ?.color,
                }}
              >
                {TAGS_OPTIONS.find((t) => t.value === tag)?.value}
              </Badge>
            ))}
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="!mt-0 ml-auto">
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <EllipsisVertical />
              <span className="sr-only">Toggle card handler</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {task.currentStage === TaskStage.SCHEDULED && (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onUpdateTask(TaskStage.CURRENT)}
              >
                Move to current
              </DropdownMenuItem>
            )}
            {task.currentStage !== TaskStage.SCHEDULED &&
              task.currentStage !== TaskStage.ARCHIVED && (
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => onUpdateTask(TaskStage.SCHEDULED)}
                >
                  Move to scheduled
                </DropdownMenuItem>
              )}
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                openDialog(task.id, DialogType.UPDATE, task.currentStage)
              }
            >
              {task.currentStage === TaskStage.ARCHIVED ? 'Info' : 'Edit'}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => mutateDeleteTask(task.id)}
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
