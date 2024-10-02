import { TASK_TYPE } from '@/constants/task';

import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface TaskCardProps {
  task: TASK_TYPE;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <Card x-chunk="dashboard-01-chunk-0" className="h-max rounded-2xl">
      <CardHeader className="block">
        <Badge variant="outline">{task.tag}</Badge>
        <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
        {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
      </CardHeader>
      <CardContent>
        {/* <div className="text-2xl font-bold">$45,231.89</div> */}
        <p className="text-xs text-muted-foreground">{task.description}</p>
      </CardContent>
    </Card>
  );
};
