'use client';
/* eslint-disable */

import { TaskCard } from '@/components/TaskCard';
import { Loader } from '@/components/ui/loader';
import { Task, TaskStatus } from '@/constants/task';
import { shallow } from 'zustand/shallow';

import { Button } from '@/components/ui/button';
import { useDialogsStore } from '@/stores/DialogsStore';
import { useTasksStore } from '@/stores/TasksStore';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useGetActiveTasks } from '../api/tasks';

const updateTasks = async (updatesPayload: any) => {
  try {
    const response = await axios.put('/api/tasks', updatesPayload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Tasks updated successfully:', response.data);
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
    } else if (error.request) {
      console.error('No Response:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  }
};

type TasksState = {
  [key in TaskStatus]: Task[];
};

const boards: TaskStatus[] = [
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.DONE,
];

export default function HomeClient() {
  const { setActiveTasks } = useTasksStore(
    (state) => ({
      setActiveTasks: state.setActiveTasks,
    }),
    shallow
  );

  const { data, isError, isLoading } = useGetActiveTasks();

  const [tasks, setTasks] = useState<TasksState>({
    [TaskStatus.TODO]: [],
    [TaskStatus.IN_PROGRESS]: [],
    [TaskStatus.DONE]: [],
    [TaskStatus.CANCEL]: [],
  });

  useEffect(() => {
    if (data) {
      const newTasks: TasksState = {
        [TaskStatus.TODO]: [],
        [TaskStatus.IN_PROGRESS]: [],
        [TaskStatus.DONE]: [],
        [TaskStatus.CANCEL]: [],
      };

      data.forEach((task) => {
        newTasks[task.status].push(task);
      });

      Object.keys(newTasks).forEach((status) => {
        newTasks[status as TaskStatus].sort((a, b) => a.position - b.position);
      });

      setTasks(newTasks);
    }
  }, [data]);

  const onDragEndAntonio = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceStatus = source.droppableId as TaskStatus;
    const destStatus = destination.droppableId as TaskStatus;

    let updatesPayload: {
      id: string;
      status: TaskStatus;
      position: number;
    }[] = [];

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

      updatesPayload = [];

      updatesPayload.push({
        id: updatedMovedTask.id,
        status: destStatus,
        position: Math.min((destination.index + 1) * 1000, 1_000_000),
      });

      newTasks[destStatus].forEach((task, index) => {
        if (task && task.id !== updatedMovedTask.id) {
          const newPosition = Math.min((index + 1) * 1000, 1_000_000);
          if (task.position !== newPosition) {
            updatesPayload.push({
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
              updatesPayload.push({
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

    updateTasks(updatesPayload);
  }, []);

  if (isLoading)
    return (
      <div className="grid h-full place-content-center">
        <Loader />
      </div>
    );

  return (
    <DragDropContext onDragEnd={onDragEndAntonio}>
      <div className="grid gap-6 lg:grid-cols-3">
        {boards.map((board) => (
          <div
            className="grid grid-rows-[max-content] gap-y-4 rounded-xl bg-gray-200 p-6"
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
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
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
      <p className="text-lg leading-9">
        {board.replace('_', ' ')}
        {!!count && <span> {count}</span>}
      </p>
      {board === 'to_do' && (
        <Button
          aria-haspopup="true"
          size="icon"
          variant="ghost"
          onClick={() => openDialog('', 'create')}
        >
          <Plus />
          <span className="sr-only">Add a new task</span>
        </Button>
      )}
    </div>
  );
};
