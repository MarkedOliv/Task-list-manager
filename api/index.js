const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { conn } = require('./src/db.js');

const taskRoutes = require('./routes/task.routes.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.name = 'API';

app.use(cors())
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true, limit: '50mb'}));
app.use(express.json({ limit: '50mb'}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

app.use('/tasks/', taskRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

conn.sync({ force: false }).then(() => {
    app.listen(PORT, ()=> {
        console.log('Server listening on port: ' + PORT);
    });
})