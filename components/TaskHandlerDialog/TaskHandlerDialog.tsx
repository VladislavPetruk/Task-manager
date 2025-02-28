import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { FolderPen } from 'lucide-react';
import { shallow } from 'zustand/shallow';

import { useCreateTask, useUpdateTask } from '@/app/api/hooks/mutations';
import {
  GET_ACTIVE_TASKS_QUERY_KEY,
  GET_COMPLETED_TASKS_QUERY_KEY,
  GET_FUTURE_TASKS_QUERY_KEY,
} from '@/app/api/hooks/queries';
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
import { Textarea } from '@/components/ui/textarea';
import { DialogType } from '@/shared/constants/other';
import {
  INITIAL_STATE,
  Task,
  TaskStage,
  TaskStatus,
} from '@/shared/constants/task';
import { formatISODate } from '@/shared/functions/formatISODate';
import { useRole } from '@/shared/hooks';
import { toast } from '@/shared/hooks/useToast';
import { cn } from '@/shared/lib/utils';
import { useDialogsStore, useTasksStore } from '@/shared/stores';
// import { useDialogsStore } from '@/stores/DialogsStore';
// import { useTasksStore } from '@/stores/TasksStore';
import { useQueryClient } from '@tanstack/react-query';

import { TiptapEditor } from '../Tiptap/TiptapEditor';
import { Loader } from '../ui/loader';

import { MultipleSelector, PrioritySelect, StatusSelect } from './Helper';

// Need create validate form, title, description

export default function TaskHandlerDialog() {
  const {
    showDialog,
    currentTaskId,
    dialogType,
    taskStage,
    toggleDialog,
    closeDialog,
  } = useDialogsStore(
    (state) => ({
      showDialog: state.showDialog,
      currentTaskId: state.currentTaskId,
      dialogType: state.dialogType,
      taskStage: state.taskStage,
      toggleDialog: state.toggleDialog,
      closeDialog: state.closeDialog,
    }),
    shallow
  );

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
  const role = useRole();

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

  const { mutate: mutateCreateTask, isPending: inPendingCreateTask } =
    useCreateTask({
      onSuccess: () => {
        if (taskStage === TaskStage.CURRENT) {
          queryClient.invalidateQueries({
            queryKey: [GET_ACTIVE_TASKS_QUERY_KEY],
          });
        }
        if (taskStage === TaskStage.SCHEDULED) {
          queryClient.invalidateQueries({
            queryKey: [GET_FUTURE_TASKS_QUERY_KEY],
          });
        }
        closeDialog();
        resetState();
        toast({
          title: 'Task successfully created',
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

  const onCreateTask = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const task = {
      title: taskState.title,
      description: taskState.description,
      tags: taskState.tags,
      priority: taskState.priority,
      status: taskState.status,
      currentStage: taskStage,
    };

    mutateCreateTask(task);
  };

  const onUpdateTask = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const task = {
      id: taskState.id,
      title: taskState.title,
      description: taskState.description,
      tags: taskState.tags,
      priority: taskState.priority,
      status: taskState.status,
      currentStage:
        taskState.status === TaskStatus.CANCEL
          ? TaskStage.ARCHIVED
          : taskState.currentStage,
    };

    mutateUpdateTask(task);
  };

  const resetState = () => setTaskState(INITIAL_STATE);

  const handleInputChange =
    (field: keyof Task) => (e: ChangeEvent<HTMLInputElement>) => {
      setTaskState((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleTextAreaChange =
    (field: keyof Task) => (e: ChangeEvent<HTMLTextAreaElement>) => {
      setTaskState((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleTiptapChange = (value: string) => {
    setTaskState((prev) => ({ ...prev, description: value }));
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
    if (taskState.currentStage === TaskStage.ARCHIVED) return 'Task info';
    switch (dialogType) {
      case DialogType.CREATE:
        return 'Add a new task';
      case DialogType.UPDATE:
        return 'Update a task';
      default:
        return 'Handler';
    }
  };

  const getButtonAction = () => {
    switch (dialogType) {
      case DialogType.CREATE:
        return onCreateTask;
      case DialogType.UPDATE:
        return onUpdateTask;
      default:
        return () => console.log(22);
    }
  };

  const getButtonText = () => {
    switch (dialogType) {
      case DialogType.CREATE:
        return 'Create a task';
      case DialogType.UPDATE:
        return 'Update a task';
      default:
        return 'Confirm';
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={toggleDialog}>
      <DialogContent
        className={cn(
          role === 'USER' ? 'sm:max-w-[500px]' : 'w-[1000px] max-w-[1000px]'
        )}
      >
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
        <div
          className={cn(
            role === 'USER'
              ? 'grid gap-y-4 py-4'
              : 'grid grid-cols-[1fr_300px] items-start gap-x-8'
          )}
        >
          <div className="grid gap-y-4">
            <div className="grid gap-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={taskState.title}
                onChange={handleInputChange('title')}
                disabled={taskState.currentStage === TaskStage.ARCHIVED}
              />
            </div>
            <div className="grid gap-y-2">
              {role === 'USER' ? (
                <>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    value={taskState.description}
                    id="description"
                    onChange={handleTextAreaChange('description')}
                    disabled={taskState.currentStage === TaskStage.ARCHIVED}
                    className="max-h-56 min-h-28"
                  />
                </>
              ) : (
                <TiptapEditor
                  value={taskState.description}
                  throttleDelay={1000}
                  className={cn(
                    'grid h-full min-h-56 w-full grid-rows-[1fr_50px] rounded-xl'
                  )}
                  editorContentClassName="overflow-auto h-full"
                  output="html"
                  placeholder="Type your description here..."
                  editable={true}
                  editorClassName="focus:outline-none px-5 py-4 h-full"
                  onChange={(value) => handleTiptapChange(value)}
                />
              )}
            </div>
          </div>
          <div className="grid gap-y-4">
            <div className="grid gap-y-2">
              <Label htmlFor="tags">Tags</Label>
              <MultipleSelector
                tags={taskState.tags}
                onChange={handleTagsChange('tags')}
                disabled={taskState.currentStage === TaskStage.ARCHIVED}
              />
            </div>
            <div className="grid gap-y-2">
              <Label htmlFor="priority">Priority</Label>
              <PrioritySelect
                value={taskState.priority}
                onChange={handleSelectChange('priority')}
                disabled={taskState.currentStage === TaskStage.ARCHIVED}
              />
            </div>
            {dialogType === DialogType.UPDATE &&
              taskState.currentStage !== TaskStage.SCHEDULED && (
                <div className="grid gap-y-2">
                  <Label htmlFor="status">Status</Label>
                  <StatusSelect
                    value={taskState.status}
                    onChange={handleSelectChange('status')}
                    disabled={taskState.currentStage === TaskStage.ARCHIVED}
                  />
                </div>
              )}
            {dialogType !== DialogType.CREATE && (
              <>
                {!!taskState.createdOn && (
                  <div className="mt-4 text-sm">
                    Created date - {formatISODate(taskState.createdOn)}
                  </div>
                )}
                {!!taskState.updatedOn && (
                  <div className="text-sm">
                    Updated date - {formatISODate(taskState.updatedOn)}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {taskState.currentStage !== TaskStage.ARCHIVED && (
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
