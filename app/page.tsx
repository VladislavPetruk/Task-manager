import { TaskCard } from '@/components/TaskCard';
import { TASK } from '@/constants/task';

export default function Home() {
  return (
    <div className="grid grid-cols-3 gap-x-6">
      <div className="grid grid-rows-[max-content] gap-y-4 rounded-xl bg-gray-200 p-6">
        <TaskCard task={TASK} />
        <TaskCard task={TASK} />
        <TaskCard task={TASK} />
        <TaskCard task={TASK} />
        <TaskCard task={TASK} />
        <TaskCard task={TASK} />
        <TaskCard task={TASK} />
      </div>
      <div className="grid grid-rows-[max-content] gap-y-4 rounded-xl bg-gray-200 p-6">
        <TaskCard task={TASK} />
        <TaskCard task={TASK} />
      </div>
      <div className="grid grid-rows-[max-content] gap-y-4 rounded-xl bg-gray-200 p-6">
        <TaskCard task={TASK} />
      </div>
    </div>
  );
}
