const { Router } = require('express');
const router = Router();

const { 
    getAllTasks, 
    getTask, 
    createTask, 
    updateTask, 
    deleteTask,
 } = require('../controllers/task.controller.js');

router.get('/', getAllTasks);
router.get('/:id',getTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;