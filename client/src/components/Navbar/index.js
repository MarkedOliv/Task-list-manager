import { AppBar, Box, Toolbar, Typography, Container, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {

  let navigate = useNavigate();

    return (
      <Box sx={{flexGrow: 1 }}>
        <AppBar position='static' color='transparent'>  
          <Container>
            <Toolbar>
              <Typography sx={{flexGrow: 1 }} variant='h6'> 
                <Link to='/' style={{textDecoration: 'none', color: '#EEEEEE'}}>
                  Task List Manager
                </Link>
              </Typography>
                <Button variant='contained' color='primary' onClick={() => navigate('/tasks/new')}>
                  New Task
                </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    )
  }