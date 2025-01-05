import  { useState, useEffect, Suspense, lazy } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Task } from './types';
import { fetchTasks } from './utils/api';

const TaskTable = lazy(() => import('./components/TaskTable'));
const AddTaskForm = lazy(() => import('./components/AddTaskForm'));
const TaskFilter = lazy(() => import('./components/Taskfilter'));
const TaskCounters = lazy(() => import('./components/TaskCounters'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [nextId, setNextId] = useState(1);

  //data fetching
  useEffect(() => {
    fetchTasks().then((fetchedTasks) => {
      setTasks(fetchedTasks);
      setFilteredTasks(fetchedTasks);
      setNextId(Math.max(...fetchedTasks.map(task => task.id)) + 1);
    });
  }, []);

  //filter functinality
  useEffect(() => {
    const filtered = tasks.filter((task) => {
      const matchesFilter = filter === 'all' || task.status === filter;
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            task.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
    setFilteredTasks(filtered);
  }, [tasks, filter, searchTerm]);

  //add task 
  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const taskWithId = { ...newTask, id: nextId };
    setTasks((prevTasks) => [...prevTasks, taskWithId]);
    setNextId((prevId) => prevId + 1);
  };

  //for update the task
  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };
//this is for delete task
  const handleDeleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" className="mt-8 min-h-screen bg-white p-4 sm:p-6 lg:p-8">
        <Typography variant="h3" component="h1" gutterBottom className="text-center">
          Task List Manager
        </Typography>
        <Suspense fallback={<CircularProgress />}>
          <Box className="mb-4">
            <AddTaskForm onAddTask={handleAddTask} />
          </Box>
          <Box className="mb-4 flex justify-between items-center">
            <TaskFilter onFilterChange={handleFilterChange} />
            <TaskCounters tasks={tasks} />
          </Box>
          <TaskTable
            tasks={filteredTasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onSearchChange={handleSearchChange}
          />
        </Suspense>
      </Container>
      <ToastContainer position="bottom-right" />
    </ThemeProvider>
  );
}

export default App;

