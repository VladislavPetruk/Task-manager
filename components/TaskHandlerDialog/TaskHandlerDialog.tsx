import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { FolderPen } from 'lucide-react';

import {
  GET_ACTIVE_TASKS_QUERY_KEY,
  GET_COMPLETED_TASKS_QUERY_KEY,
  GET_FUTURE_TASKS_QUERY_KEY,
  useCreateTask,
  useUpdateTask,
} from '@/app/api/tasks';
// import { useUpdateTask } from '@/app/api/tasks/[id]';
// import { useCreateTask } from '@/app/api/tasks/create';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { INITIAL_STATE, Task } from '@/constants/task';
import { toast } from '@/hooks/useToast';
import { useDialogsStore, useTasksStore } from '@/stores';
// import { useDialogsStore } from '@/stores/DialogsStore';
// import { useTasksStore } from '@/stores/TasksStore';
import { useQueryClient } from '@tanstack/react-query';

import { Loader } from '../ui/loader';

import { MultipleSelector, PrioritySelect, StatusSelect } from './Helper';

// Need create validate form, title, description

export default function UpdateTaskDialog() {
  const showDialog = useDialogsStore((state) => state.showDialog);
  const currentTaskId = useDialogsStore((state) => state.currentTaskId);
  const dialogType = useDialogsStore((state) => state.dialogType);
  const taskType = useDialogsStore((state) => state.taskType);
  const toggleDialog = useDialogsStore((state) => state.toggleDialog);
  const closeDialog = useDialogsStore((state) => state.closeDialog);

  const allTasksInStore = useTasksStore((state) => state.allTasks);

  const [taskState, setTaskState] = useState<Task>(INITIAL_STATE);

  useEffect(() => {
    resetState();

    const currentTask = allTasksInStore.get(currentTaskId);
    if (currentTask) {
      setTaskState(currentTask);
    }
  }, [currentTaskId, allTasksInStore]);

  const queryClient = useQueryClient();

  const { mutate: mutateUpdateTask, isPending: inPendingUpdateTask } =
    useUpdateTask({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [GET_ACTIVE_TASKS_QUERY_KEY],
        });
        queryClient.invalidateQueries({
          queryKey: [GET_COMPLETED_TASKS_QUERY_KEY],
        });
        closeDialog();
        resetState();
      },
      onError: (error) => {
        toast({
          title: error.message || 'Something went wrong',
          variant: 'destructive',
        });
      },
    });

  const { mutate: mutateCreateTask, isPending: inPendingCreateTask } =
    useCreateTask({
      onSuccess: () => {
        if (taskType === 'active') {
          queryClient.invalidateQueries({
            queryKey: [GET_ACTIVE_TASKS_QUERY_KEY],
          });
        }
        if (taskType === 'futured') {
          queryClient.invalidateQueries({
            queryKey: [GET_FUTURE_TASKS_QUERY_KEY],
          });
        }
        closeDialog();
        resetState();
      },
      onError: (error) => {
        toast({
          title: error.message || 'Something went wrong',
          variant: 'destructive',
        });
      },
    });

  const onCreateTask = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const task = {
      title: taskState.title,
      description: taskState.description,
      tags: taskState.tags,
      priority: taskState.priority,
      status: taskState.status,
      isFutured: taskType === 'futured',
    };

    mutateCreateTask(task);
  };

  const onUpdateTask = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const isCompleted = taskState.status === 'cancel';
    const isFutured = false;

    const updatedTask = {
      id: taskState.id,
      title: taskState.title,
      description: taskState.description,
      tags: taskState.tags,
      priority: taskState.priority,
      status: taskState.status,
      isCompleted,
      isFutured,
    };

    mutateUpdateTask(updatedTask);
  };

  const resetState = () => setTaskState(INITIAL_STATE);

  const handleInputChange =
    (field: keyof Task) => (e: ChangeEvent<HTMLInputElement>) => {
      setTaskState((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSelectChange = (field: keyof Task) => (value: string) => {
    setTaskState((prev) => ({ ...prev, [field]: value }));
  };

  const handleTagsChange = (field: keyof Task) => (newValues: string[]) => {
    setTaskState((prev) => ({
      ...prev,
      [field]: newValues,
    }));
  };

  const getDialogTitle = () => {
    if (taskState.isCompleted) return 'Task info';
    switch (dialogType) {
      case 'create':
        return 'Add a new task';
      case 'update':
        return 'Update a task';
      default:
        return 'Handler';
    }
  };

  const getButtonAction = () => {
    switch (dialogType) {
      case 'create':
        return onCreateTask;
      case 'update':
        return onUpdateTask;
      default:
        return () => console.log(22);
    }
  };

  const getButtonText = () => {
    switch (dialogType) {
      case 'create':
        return 'Create a task';
      case 'update':
        return 'Update a task';
      default:
        return 'Confirm';
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={toggleDialog}>
      <DialogContent className="sm:max-w-[500px]">
        {(inPendingUpdateTask || inPendingCreateTask) && (
          <div className="absolute inset-0 grid place-content-center bg-accent/50">
            <Loader />
          </div>
        )}
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Task handler dialog
        </DialogDescription>
        <div className="grid gap-y-4 py-4">
          <div className="grid gap-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={taskState.title}
              onChange={handleInputChange('title')}
              disabled={taskState.isCompleted}
            />
          </div>
          <div className="grid gap-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={taskState.description}
              onChange={handleInputChange('description')}
              disabled={taskState.isCompleted}
            />
          </div>
          <div className="grid gap-y-2">
            <Label htmlFor="tags">Tags</Label>
            <MultipleSelector
              tags={taskState.tags}
              onChange={handleTagsChange('tags')}
              disabled={taskState.isCompleted}
            />
          </div>
          <div className="grid gap-y-2">
            <Label htmlFor="priority">Priority</Label>
            <PrioritySelect
              value={taskState.priority}
              onChange={handleSelectChange('priority')}
              disabled={taskState.isCompleted}
            />
          </div>
          {dialogType === 'update' && taskType !== 'futured' && (
            <div className="grid gap-y-2">
              <Label htmlFor="status">Status</Label>
              <StatusSelect
                value={taskState.status}
                onChange={handleSelectChange('status')}
                disabled={taskState.isCompleted}
              />
            </div>
          )}
        </div>
        {!taskState.isCompleted && (
          <DialogFooter>
            <Button type="submit" className="pl-3" onClick={getButtonAction()}>
              <FolderPen className="mr-1" size={20} />
              {getButtonText()}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
