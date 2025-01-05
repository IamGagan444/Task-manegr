import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface TaskFilterProps {
  onFilterChange: (filter: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  const handleFilterChange = (event: SelectChangeEvent) => {
    onFilterChange(event.target.value as string);
  };

  return (
    <FormControl className="min-w-[200px]">
      <InputLabel>Filter by Status</InputLabel>
      <Select defaultValue="all" onChange={handleFilterChange}>
        <MenuItem value="all">All Tasks</MenuItem>
        <MenuItem value="To Do">To Do</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TaskFilter;

