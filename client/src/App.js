import { Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';

export default function App() {
  return (
    <div>
      <Navbar />
      <Container>
        <Routes>
          <Route path='/' element={<TaskList />}></Route>
          <Route path='/tasks/new' element={<TaskForm />}></Route>
          <Route path='/tasks/:id/edit' element={<TaskForm />}></Route>
        </Routes>      
      </Container>
    </div>
  )
}