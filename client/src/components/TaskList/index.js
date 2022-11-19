import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';

export default function TaskList() {

  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await fetch('http://localhost:3001/tasks');
    const data = await res.json();
    setTasks(data)
  }  
  const handleDelete = async (id) => {
    try {
      setTasks(tasks.filter((task) => task.id !== id));
      await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    loadTasks();
  }, [])
    
  return (
      <>
        <h1>Task List</h1>
        {
          tasks.map(t => (
            <Card key={t.id} style={{marginBottom: '.7rem', backgroundColor: '#1E272E'}}>
              <CardContent style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{color: '#FFFFFF'}}>
                  <Typography>{t.title}</Typography>
                  <Typography>{t.description}</Typography>
                </div>
                <div>
                  <Button variant='contained' color='inherit' onClick={() => navigate(`/tasks/${t.id}/edit`)}>Edit</Button>
                  <Button variant='contained' color='warning' style={{marginLeft: ".4rem"}} onClick={() => handleDelete(t.id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))
        }
      </>
    )
  }