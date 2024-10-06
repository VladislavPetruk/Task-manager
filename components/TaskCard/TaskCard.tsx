import { CSSProperties } from 'react';
import { EllipsisVertical } from 'lucide-react';

import { PRIORITY_COLORS, TASK_TYPE } from '@/constants/task';
import { cn } from '@/lib/utils';

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
  const color = PRIORITY_COLORS[task.priority];

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
              Delete
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
