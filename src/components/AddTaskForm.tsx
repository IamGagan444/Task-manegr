import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { Task } from '../types';
import { toast } from 'react-toastify';

interface AddTaskFormProps {
  onAddTask: (task: Omit<Task, 'id'>) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      const newTask: Omit<Task, 'id'> = {
        title,
        description,
        status,
      };
      onAddTask(newTask);
      setTitle('');
      setDescription('');
      setStatus('To Do');
      toast.success('Task added successfully');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <TextField
          label="Title"
          // https://github.com/IamGagan444/task-maneger.git
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="md:col-span-1"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="md:col-span-2"
        />
        <FormControl className="md:col-span-1">
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value as string)}>
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" className="md:col-span-4">
          Add Task
        </Button>
      </Box>
    </form>
  );
};

export default AddTaskForm;

