import { SyntheticEvent, useEffect, useState } from 'react';
import { FolderPen } from 'lucide-react';

import {
  GET_ACTIVE_TASKS_QUERY_KEY,
  GET_COMPLETED_TASKS_QUERY_KEY,
} from '@/app/api/tasks';
import { useUpdateTask } from '@/app/api/tasks/[id]';
import { useCreateTask } from '@/app/api/tasks/create';
// import { useUpdateTask } from '@/app/api/tasks/[id]';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  PRIORITY_COLORS,
  Task,
  TaskPriority,
  TaskStatus,
} from '@/constants/task';
import { toast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';
import { useDialogsStore } from '@/stores/DialogsStore';
import { useTasksStore } from '@/stores/TasksStore';
import { useQueryClient } from '@tanstack/react-query';

import { Loader } from '../ui/loader';

export default function UpdateTaskDialog() {
  const showDialog = useDialogsStore((state) => state.showDialog);
  const currentTaskId = useDialogsStore((state) => state.currentTaskId);
  const dialogType = useDialogsStore((state) => state.dialogType);
  const toggleDialog = useDialogsStore((state) => state.toggleDialog);
  const closeDialog = useDialogsStore((state) => state.closeDialog);

  const allTasksInStore = useTasksStore((state) => state.allTasks);

  const [title, setTitle] = useState<Task['title']>('');
  const [description, setDescription] = useState<Task['description']>('');
  const [tags, setTags] = useState<Task['tags']>([]);
  const [priority, setPriority] = useState<Task['priority']>(
    TaskPriority.MEDIUM
  );
  const [status, setStatus] = useState<Task['status']>(TaskStatus.TODO);
  const [isCompleted, setIsCompleted] = useState<Task['isCompleted']>(false);
  const [, setIsFutured] = useState<Task['isFutured']>(false);
  const [id, setId] = useState<Task['id']>('');

  useEffect(() => {
    const currentTask = allTasksInStore.get(currentTaskId);
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setTags(currentTask.tags);
      setPriority(currentTask.priority);
      setStatus(currentTask.status);
      setIsCompleted(currentTask.isCompleted);
      setIsFutured(currentTask.isFutured);
      setId(currentTask.id);
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

  const { mutate: mutateCreateTask } = useCreateTask({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ACTIVE_TASKS_QUERY_KEY] });
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

    const newTask = {
      title,
      description,
      tags,
      priority,
      status,
      comments: [],
    };

    mutateCreateTask(newTask);
  };

  const onUpdateTask = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const isCompleted = status === 'cancel';
    const isFutured = false;

    const updatedTask = {
      id,
      title,
      description,
      tags,
      priority,
      status,
      isCompleted,
      isFutured,
    };

    mutateUpdateTask(updatedTask);
  };

  const resetState = () => {
    setTitle('');
    setDescription('');
    setTags([]);
    setId('');
  };

  return (
    <Dialog open={showDialog} onOpenChange={toggleDialog}>
      <DialogContent className="sm:max-w-[500px]">
        {!inPendingUpdateTask && (
          <div className="absolute inset-0 grid place-content-center bg-accent/50">
            <Loader />
          </div>
        )}
        <DialogHeader>
          <DialogTitle>
            {/* {isCompleted ? 'Task info' : 'Update task'} */}
            {isCompleted
              ? 'Task info'
              : dialogType === 'create'
                ? 'Add a new task'
                : dialogType === 'update'
                  ? 'Update a task'
                  : 'Handler'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-y-4 py-4">
          <div className="grid gap-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isCompleted}
            />
          </div>
          <div className="grid gap-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isCompleted}
            />
          </div>
          {/* <div className="grid gap-y-2">
            <Label htmlFor="tag">Tag</Label>
            <Input
              id="tag"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              disabled={isCompleted}
            />
          </div> */}
          <div className="grid gap-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={priority}
              onValueChange={(e: Task['priority']) => setPriority(e)}
              disabled={isCompleted}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a task priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low" className="cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(`h-4 w-4 rounded-full`)}
                      style={{
                        backgroundColor: PRIORITY_COLORS['low'],
                      }}
                    ></div>
                    Low
                  </div>
                </SelectItem>
                <SelectItem value="medium" className="cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(`h-4 w-4 rounded-full`)}
                      style={{
                        backgroundColor: PRIORITY_COLORS['medium'],
                      }}
                    ></div>
                    Medium
                  </div>
                </SelectItem>
                <SelectItem value="high" className="cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(`h-4 w-4 rounded-full`)}
                      style={{
                        backgroundColor: PRIORITY_COLORS['high'],
                      }}
                    ></div>
                    High
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {dialogType === 'update' && (
            <div className="grid gap-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(e: Task['status']) => setStatus(e)}
                disabled={isCompleted}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a task status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="to_do" className="cursor-pointer">
                    <div className="flex items-center gap-3">To do</div>
                  </SelectItem>
                  <SelectItem value="in_progress" className="cursor-pointer">
                    <div className="flex items-center gap-3">In progress</div>
                  </SelectItem>
                  <SelectItem value="done" className="cursor-pointer">
                    <div className="flex items-center gap-3">Done</div>
                  </SelectItem>
                  <SelectItem value="cancel" className="cursor-pointer">
                    <div className="flex items-center gap-3">Cancel</div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        {!isCompleted && (
          <DialogFooter>
            <Button
              type="submit"
              className="pl-3"
              onClick={
                dialogType === 'create'
                  ? onCreateTask
                  : dialogType === 'update'
                    ? onUpdateTask
                    : () => console.log(22)
              }
            >
              <FolderPen className="mr-1" size={20} />
              {dialogType === 'create'
                ? 'Create a task'
                : dialogType === 'update'
                  ? 'Update a task'
                  : 'Confirm'}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
