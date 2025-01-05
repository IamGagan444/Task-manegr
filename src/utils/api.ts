import { Task } from '../types';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await response.json();
  return data.slice(0, 20).map((task: any) => ({
    id: task.id,
    title: task.title,
    description: `This is task ${task.id} description.`,
    status: task.completed ? 'Done' : 'To Do',
  }));
};

