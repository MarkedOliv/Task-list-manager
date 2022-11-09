const express = require('express');
const morgan = require('morgan');

const taskRoutes = require('./routes/task.routes.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(morgan('dev'));

app.use('/tasks/', taskRoutes);

app.listen(PORT, ()=> {
    console.log('Server on port: ' + PORT);
});