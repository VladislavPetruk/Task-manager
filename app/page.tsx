'use client';

import { useState } from 'react';
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
import { PRIORITY_COLORS, TASKS } from '@/constants/task';
import { cn } from '@/lib/utils';
// import { createSwapy } from 'swapy';
// import { useEffect } from 'react';

const filterTasks = (status: string) => {
  return TASKS.filter((task) => task.status === status);
};

const TO_DO_TASKS = filterTasks('to do');
const IN_PROGRESS_TASKS = filterTasks('in progress');
const DONE_TASKS = filterTasks('done');

export default function Home() {
  const [date, setDate] = useState<Date>();
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

  return (
    <div className="container1 grid grid-cols-3 gap-x-6">
      <div className="grid grid-rows-[max-content] gap-y-4 rounded-xl bg-gray-200 p-6">
        <div className="flex items-center justify-between font-medium">
          <p className="text-lg">To do</p>
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
                  <Button type="submit" className="pl-3">
                    <Plus className="mr-1" size={20} /> Create a task
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* <Button aria-haspopup="true" size="icon" variant="ghost">
            <EllipsisVertical />
              <span className="sr-only">Toggle card handler</span>
            </Button> */}
          </div>
        </div>
        {TO_DO_TASKS.map((task) => (
          // <div data-swapy-slot={task.id} key={task.id}>
          <TaskCard task={task} key={task.id} />
          // </div>
        ))}
      </div>
      <div className="grid grid-rows-[max-content] gap-y-4 rounded-xl bg-gray-200 p-6">
        {IN_PROGRESS_TASKS.map((task) => (
          // <div data-swapy-slot={task.id} key={task.id}>
          <TaskCard task={task} key={task.id} />
          // </div>
        ))}
      </div>
      <div className="grid grid-rows-[max-content] gap-y-4 rounded-xl bg-gray-200 p-6">
        {DONE_TASKS.map((task) => (
          // <div data-swapy-slot={task.id} key={task.id}>
          <TaskCard task={task} key={task.id} />
          // </div>
        ))}
      </div>
    </div>
  );
}
