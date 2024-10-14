'use client';
/* eslint-disable */

import { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { CalendarIcon, Plus } from 'lucide-react';

import { TaskCard } from '@/components/TaskCard';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { Loader } from '@/components/ui/loader';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PRIORITY_COLORS, TASK_TYPE } from '@/constants/task';
import { cn } from '@/lib/utils';

import { useGetActiveTasks } from '../api/tasks';
// import { createSwapy } from 'swapy';
// import { useEffect } from 'react';

const filterTasks = (tasks: Array<TASK_TYPE> | undefined, status: string) => {
  if (!tasks) return;
  return tasks.filter((task) => task.status === status);
};

// const TO_DO_TASKS = filterTasks('to do');
// const IN_PROGRESS_TASKS = filterTasks('in progress');
// const DONE_TASKS = filterTasks('done');

export default function Home() {
  const { data, isError, isLoading } = useGetActiveTasks();
  const [date, setDate] = useState<Date>();
  const [title] = useState('Test title 222');
  const [description] = useState('Test descr  2222');
  const [tag] = useState('hobby');
  const [priority] = useState('medium');
  const [status] = useState('in_progress');
  // useEffect(() => {
  //   const container = document.querySelector('.container1')!;
  //   const swapy = createSwapy(container, {});
  //   swapy.onSwap(({ data }) => {
  //     console.log(data);
  //   });
  //   return () => {
  //     swapy.destroy();
  //   };
  // }, []);

  if (isLoading)
    return (
      <div className="grid h-full place-content-center">
        <Loader />
      </div>
    );

  const TO_DO_TASKS = filterTasks(data, 'to_do');
  const IN_PROGRESS_TASKS = filterTasks(data, 'in_progress');
  const DONE_TASKS = filterTasks(data, 'done');

  const handleSubmit = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const task = {
      title,
      description,
      // date,
      tag,
      priority,
      status,
    };

    try {
      const res = await axios.post('/api/tasks', task);

      console.log(res.data);

      // if (res.data.error) {
      //   toast.error(res.data.error);
      // }

      // if (!res.data.error) {
      //   toast.success("Task created successfully.");
      //   allTasks();
      //   closeModal();
      // }
    } catch (error) {
      // toast.error("Something went wrong.");
      console.log(error);
    }
  };

  const handleGet = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.get('/api/tasks');

      console.log(res.data);

      // if (res.data.error) {
      //   toast.error(res.data.error);
      // }

      // if (!res.data.error) {
      //   toast.success("Task created successfully.");
      //   allTasks();
      //   closeModal();
      // }
    } catch (error) {
      // toast.error("Something went wrong.");
      console.log(error);
    }
  };

  if (!TO_DO_TASKS || !IN_PROGRESS_TASKS || !DONE_TASKS) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="grid grid-rows-[max-content] gap-y-4 rounded-xl bg-gray-200 p-6">
        <div className="flex items-center justify-between font-medium">
          <p className="text-lg">
            To do {!!TO_DO_TASKS?.length && <span>{TO_DO_TASKS.length}</span>}
          </p>
          <div>
            <Dialog>
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
                    <Input id="title" />
                  </div>
                  <div className="grid gap-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" />
                  </div>
                  <div className="grid gap-y-2">
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
                          {date ? (
                            format(date, 'PPP')
                          ) : (
                            <span>Select a date</span>
                          )}
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
                  </div>
                  <div className="grid gap-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
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
                  {/* <Button type="submit" className="pl-3" onClick={handleGet}>
                    <Plus className="mr-1" size={20} /> Get tasks
                  </Button> */}
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* <Button aria-haspopup="true" size="icon" variant="ghost">
            <EllipsisVertical />
              <span className="sr-only">Toggle card handler</span>
            </Button> */}
          </div>
        </div>
        {TO_DO_TASKS?.map((task) => (
          // <div data-swapy-slot={task.id} key={task.id}>
          <TaskCard task={task} key={task.id} />
          // </div>
        ))}
      </div>
      <div className="grid grid-rows-[max-content] gap-y-4 rounded-xl bg-gray-200 p-6">
        <div className="flex items-center justify-between font-medium">
          <p className="text-lg">
            In progress{' '}
            {!!IN_PROGRESS_TASKS?.length && (
              <span>{IN_PROGRESS_TASKS.length}</span>
            )}
          </p>
        </div>
        {IN_PROGRESS_TASKS?.map((task) => (
          // <div data-swapy-slot={task.id} key={task.id}>
          <TaskCard task={task} key={task.id} />
          // </div>
        ))}
      </div>
      <div className="grid grid-rows-[max-content] gap-y-4 rounded-xl bg-gray-200 p-6">
        <div className="flex items-center justify-between font-medium">
          <p className="text-lg">
            Done {!!DONE_TASKS?.length && <span>{DONE_TASKS.length}</span>}
          </p>
        </div>
        {DONE_TASKS?.map((task) => (
          // <div data-swapy-slot={task.id} key={task.id}>
          <TaskCard task={task} key={task.id} />
          // </div>
        ))}
      </div>
    </div>
  );
}
