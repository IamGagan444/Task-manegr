import React from 'react';
import { Box, Typography } from '@mui/material';
import { Task } from '../types';

interface TaskCountersProps {
  tasks: Task[];
}

const TaskCounters: React.FC<TaskCountersProps> = ({ tasks }) => {
  const todoCount = tasks.filter((task) => task.status === 'To Do').length;
  const inProgressCount = tasks.filter((task) => task.status === 'In Progress').length;
  const doneCount = tasks.filter((task) => task.status === 'Done').length;

  return (
    <Box className="flex space-x-4">
      <Typography>To Do: {todoCount}</Typography>
      <Typography>In Progress: {inProgressCount}</Typography>
      <Typography>Done: {doneCount}</Typography>
    </Box>
  );
};

export default TaskCounters;

