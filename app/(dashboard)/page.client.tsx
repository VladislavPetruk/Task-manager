'use client';

import { useCallback, useEffect, useState } from 'react';
import { EllipsisVertical, Plus } from 'lucide-react';
import { shallow } from 'zustand/shallow';

import { TaskCard } from '@/components/TaskCard';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { DialogType } from '@/constants/other';
import { STATUS_LABELS, Task, TaskStage, TaskStatus } from '@/constants/task';
import { toast } from '@/hooks/useToast';
import { useDialogsStore, useTasksStore } from '@/stores';
// import { useDialogsStore } from '@/stores/DialogsStore';
// import { useTasksStore } from '@/stores/TasksStore';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';
import { useQueryClient } from '@tanstack/react-query';

import { useDragAndDropTasks } from '../api/hooks/mutations';
import {
  GET_ACTIVE_TASKS_QUERY_KEY,
  useGetActiveTasks,
} from '../api/hooks/queries';

/* eslint-disable */

type TasksState = {
  [key in TaskStatus]: Task[];
};

const boards: TaskStatus[] = [
  TaskStatus.TO_DO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.DONE,
];

export default function HomeClient() {
  const openDialog = useDialogsStore((state) => state.openDialog);
  const { setActiveTasks } = useTasksStore(
    (state) => ({
      setActiveTasks: state.setActiveTasks,
    }),
    shallow
  );

  const queryClient = useQueryClient();

  const { data: activeTasks, isLoading } = useGetActiveTasks();
  const { mutate: mutateUpdateTasks } = useDragAndDropTasks({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_ACTIVE_TASKS_QUERY_KEY],
      });
    },
    onError: (error) => {
      toast({
        title: error.message || 'Something went wrong',
        variant: 'destructive',
      });
    },
  });

  const [tasks, setTasks] = useState<TasksState>({
    [TaskStatus.TO_DO]: [],
    [TaskStatus.IN_PROGRESS]: [],
    [TaskStatus.DONE]: [],
    [TaskStatus.CANCEL]: [],
  });

  useEffect(() => {
    if (activeTasks) {
      const newTasks: TasksState = {
        [TaskStatus.TO_DO]: [],
        [TaskStatus.IN_PROGRESS]: [],
        [TaskStatus.DONE]: [],
        [TaskStatus.CANCEL]: [],
      };

      activeTasks.forEach((task) => {
        newTasks[task.status].push(task);
      });

      Object.keys(newTasks).forEach((status) => {
        newTasks[status as TaskStatus].sort((a, b) => a.position - b.position);
      });

      setTasks(newTasks);
      setActiveTasks(activeTasks);
    }
  }, [activeTasks]);

  const onDragEndAntonio = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceStatus = source.droppableId as TaskStatus;
    const destStatus = destination.droppableId as TaskStatus;

    let updatedTasks: Array<{
      id: string;
      status: TaskStatus;
      position: number;
    }> = [];

    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };

      const sourceColumn = [...newTasks[sourceStatus]];
      const [movedTask] = sourceColumn.splice(source.index, 1);

      if (!movedTask) {
        return prevTasks;
      }

      const updatedMovedTask =
        sourceStatus !== destStatus
          ? { ...movedTask, status: destStatus }
          : movedTask;

      newTasks[sourceStatus] = sourceColumn;

      const destColumn = [...newTasks[destStatus]];
      destColumn.splice(destination.index, 0, updatedMovedTask);
      newTasks[destStatus] = destColumn;

      updatedTasks = [];

      updatedTasks.push({
        id: updatedMovedTask.id,
        status: destStatus,
        position: Math.min((destination.index + 1) * 1000, 1_000_000),
      });

      newTasks[destStatus].forEach((task, index) => {
        if (task && task.id !== updatedMovedTask.id) {
          const newPosition = Math.min((index + 1) * 1000, 1_000_000);
          if (task.position !== newPosition) {
            updatedTasks.push({
              id: task.id,
              status: destStatus,
              position: newPosition,
            });
          }
        }
      });

      if (sourceStatus !== destStatus) {
        newTasks[sourceStatus].forEach((task, index) => {
          if (task) {
            const newPosition = Math.min((index + 1) * 1000, 1_000_000);
            if (task.position !== newPosition) {
              updatedTasks.push({
                id: task.id,
                status: sourceStatus,
                position: newPosition,
              });
            }
          }
        });
      }
      return newTasks;
    });

    mutateUpdateTasks(updatedTasks);
  }, []);

  if (isLoading)
    return (
      <div className="grid h-full place-content-center">
        <Loader />
      </div>
    );

  return (
    <DragDropContext onDragEnd={onDragEndAntonio}>
      <div className="relative grid gap-6 lg:grid-cols-3">
        {boards.map((board) => (
          <div
            className="grid grid-rows-[max-content_max-content] gap-y-4 rounded-xl bg-accent p-6"
            key={board}
          >
            <ColumnHeader board={board} count={tasks[board].length} />
            <Droppable droppableId={board}>
              {(droppableProvided) => (
                <div
                  className="h-full min-h-40"
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                >
                  {tasks[board].map((task, i) => (
                    <Draggable draggableId={task.id} index={i} key={task.id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-4"
                        >
                          <TaskCard key={task.id} {...task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                </div>
              )}
            </Droppable>
            {/* {board === TaskStatus.TO_DO && (
              <Button
                aria-haspopup="true"
                variant={null}
                onClick={() =>
                  openDialog('', DialogType.CREATE, TaskStage.CURRENT)
                }
                className="h-max bg-background py-3 font-medium"
              >
                <Plus />
                Create a new task
              </Button>
            )} */}
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}

interface ColumnHeaderProps {
  board: TaskStatus;
  count: number;
}

const ColumnHeader = ({ board, count }: ColumnHeaderProps) => {
  const openDialog = useDialogsStore((state) => state.openDialog);

  return (
    <div className="flex items-center justify-between font-medium">
      <div className="flex items-center gap-x-2 font-bold uppercase leading-8">
        <p className="shrink-0">{STATUS_LABELS[board]}</p>
        <div className="grid h-8 min-w-8 place-content-center rounded-3xl bg-accent-foreground/10 px-2">
          {count}
        </div>
      </div>

      {/* to do later */}
      <div className="flex items-center">
        {board === TaskStatus.TO_DO && (
          <Button
            aria-haspopup="true"
            size="icon"
            variant="ghost"
            onClick={() => openDialog('', DialogType.CREATE, TaskStage.CURRENT)}
          >
            <Plus />
            <span className="sr-only">Add a new task</span>
          </Button>
        )}
        <Button
          aria-haspopup="true"
          size="icon"
          variant="ghost"
          onClick={() =>
            toast({
              title: 'In develompment:)',
            })
          }
        >
          <EllipsisVertical />
          <span className="sr-only">Move to ...</span>
        </Button>
      </div>
    </div>
  );
};
