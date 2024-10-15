import { SyntheticEvent, useState } from 'react';
import { Plus } from 'lucide-react';

import { GET_ACTIVE_TASKS_QUERY_KEY, useCreateTask } from '@/app/api/tasks';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { PRIORITY_COLORS, TASK_TYPE } from '@/constants/task';
import { toast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';

export const CreateTaskDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  // const [date, setDate] = useState<Date | undefined>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('hobby');
  const [priority, setPriority] = useState<TASK_TYPE['priority']>('medium');
  const [status] = useState<TASK_TYPE['status']>('to_do');

  const queryClient = useQueryClient();

  const { mutate } = useCreateTask({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ACTIVE_TASKS_QUERY_KEY] });
      setOpen(false);
    },
    onError: (error) => {
      toast({
        title: error.message || 'Something went wrong',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      tag,
      priority,
      status,
    };

    mutate(newTask);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <Plus />
          <span className="sr-only">Add a new task</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add a new task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-y-4 py-4">
          <div className="grid gap-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-y-2">
            <Label htmlFor="tag">Tag</Label>
            <Input
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </div>
          {/* <div className="grid gap-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div> */}
          <div className="grid gap-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={priority}
              onValueChange={(e: TASK_TYPE['priority']) => setPriority(e)}
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
        </div>
        <DialogFooter>
          <Button type="submit" className="pl-3" onClick={handleSubmit}>
            <Plus className="mr-1" size={20} /> Create a task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
