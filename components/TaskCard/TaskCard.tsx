import { PRIORITY_COLORS, TASK_TYPE } from '@/constants/task';

import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { EllipsisVertical } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '../ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: TASK_TYPE;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const color = PRIORITY_COLORS[task.priority];
  
  return (
    <Card
      x-chunk="dashboard-01-chunk-0"
      className={cn(`h-max relative overflow-hidden rounded-2xl before:content-[''] before:absolute before:w-1.5 before:h-full before:bg-[var(--user-color)]`)}
      style={{
        // @ts-ignore
        '--user-color': color,
      }}
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
            <DropdownMenuItem className='cursor-pointer'>Edit</DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl font-medium mb-1">{task.title}</CardTitle>
        <p className="text-muted-foreground">{task.description}</p>
      </CardContent>
    </Card>
  );
};
