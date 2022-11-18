import { Grid, Card, Typography, CardContent, TextField, Button, CircularProgress } from "@mui/material";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TaskForm() {
  
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: '',
    description:'',
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    
    setLoading(true);

    const res = await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: { 'Content-Type': 'application/json'}
    })
    const data = await res.json();
    console.log(data)

    setLoading(false);
    navigate('/')
  };
  
  return (
      <Grid container direction='column' alignItems='center' justifyContent='center'>
        <Grid item xs={3}>
          <Card sx={{mt: 5}} style={{ backgroundColor: '#1E272E', padding: '1rem'}}>
            <Typography variant='h5' textAlign='center' color='#FFFFFF'>
              Create Task
            </Typography>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField name='title' onChange={(e) => handleChange(e)} variant="filled" label="Write your title" sx={{display: 'block', margin: '0.5rem'}} inputProps={{style: {color: '#FFFFFF'}}} InputLabelProps={{style: {color: '#FFFFFF'}}}/>
                <TextField name='description' onChange={(e) => handleChange(e)} variant="filled" label="Write your description" multiline rows={4} sx={{display: 'block', margin: '0.5rem'}} inputProps={{style: {color: '#FFFFFF'}}} InputLabelProps={{style: {color: '#FFFFFF'}}}/>
                <Button variant='contained' color='primary' type='submit' disabled={!task.title || !task.description}>{loading ? <CircularProgress color="inherit" size={24}/> : 'Save'}</Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }