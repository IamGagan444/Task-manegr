import React, { useRef, useEffect, useState, useCallback } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';
import { Task } from '../types';
import { TextField, Box } from '@mui/material';
import { toast } from 'react-toastify';
import useDebounce from '../hooks/useDebounce';

interface TaskTableProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
  onSearchChange: (searchTerm: string) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onUpdateTask, onDeleteTask, onSearchChange }) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (tableRef.current) {
      const table = new Tabulator(tableRef.current, {
        data: tasks,
        layout: 'fitColumns',
        responsiveLayout: 'hide',
        columns: [
          { title: 'ID', field: 'id', width: 50 },
          { title: 'Title', field: 'title', editor: 'input', validator: 'required' },
          { title: 'Description', field: 'description', editor: 'textarea', validator: 'required' },
          {
            title: 'Status',
            field: 'status',
            editor: 'select' as any,
            editorParams: { values: ['To Do', 'In Progress', 'Done'] },
          },
          {
            title: 'Actions',
            formatter: function() {
              return '<button class="edit-btn mr-2">Edit</button><button class="delete-btn">Delete</button>';
            },
            width: 150,
            hozAlign: 'center',
            cellClick: function(e, cell) {
              const taskId = cell.getRow().getData().id;
              if (e.target instanceof HTMLElement) {
                if (e.target.classList.contains('edit-btn')) {
                  cell.getRow().toggleSelect();
                } else if (e.target.classList.contains('delete-btn')) {
                  onDeleteTask(taskId);
                  toast.success('Task deleted successfully');
                }
              }
            },
          },
        ],
        selectable: 1,
        // rowClick: function(e, row) {
        //   row.toggleSelect();
        // },
        // rowSelectionChanged: function(data:any, rows:any) {
        //   if (data.length > 0) {
        //     const selectedTask = data[0] as Task;
        //     onUpdateTask(selectedTask);
        //     toast.success('Task updated successfully');
        //   }
        // },
      });

      return () => {
        table.destroy();
      };
    }
  }, [tasks, onUpdateTask, onDeleteTask]);

  useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearchChange]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <Box>
      <TextField
        label="Search tasks"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div ref={tableRef} className="task-table"></div>
    </Box>
  );
};

export default TaskTable;

