const { Tasks } = require('../db.js');

const getAllTasks = async (req, res, next) => {

    try {
        const allTasks = await Tasks.findAll({});
        res.status(200).json(allTasks);
    } catch (error) {
        next(error);
    }
}
const getTask = async (req, res, next) => {
    const { id } = req.params;

    try {
        if(!id) return res.json({ message: 'No ID provided'});
        const task = await Tasks.findOne({ where: {id}});
        if(!task) return res.status(404).json({ message: 'Task not found :(('});
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
}
const createTask = async (req, res, next) => {
    const { title, description } = req.body;

    try {
        if(!title) return res.json({error: {message: "Title cannot be undefined"}});
        const newTask = await Tasks.create({title: title, description: description});
        res.status(201).json({ message: 'Task created succesfully'});
    } catch (error) {
        next(error);
    }
}
const updateTask= async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        if(!id) return res.json({ message: 'No ID provided'});
        if(!title && !description) return res.status(404).json({ message: 'No data provided'})
        if(title && description) {
            const task = await Tasks.update({title, description},{ where: {id}});
            if(!task) return res.status(404).json({ message: 'Task not found :(('});
            const updatedTask = await Tasks.findOne({ where: {id}});
            return res.status(202).json(updatedTask);
        }
        if(title && !description) {
            const task = await Tasks.update({title},{ where: {id}});
            if(!task) return res.status(404).json({ message: 'Task not found :(('});
            const updatedTask = await Tasks.findOne({ where: {id}});
            return res.status(202).json(updatedTask);
        }
        if(!title && description) {
            const task = await Tasks.update({description},{ where: {id}});
            if(!task) return res.status(404).json({ message: 'Task not found :(('});
            const updatedTask = await Tasks.findOne({ where: {id}});
            return res.status(202).json(updatedTask);
        }
    
    } catch (error) {
        next(error);
    }
}
const deleteTask= async (req, res, next) => {
    const { id } = req.params;

    try {
        if(!id) return res.json({ message: 'No ID provided'});
        const task = await Tasks.findOne({ where: {id}});
        if(!task) return res.status(404).json({ message: 'Task not found :(('});
        await Tasks.destroy({ where: {id}});
        return res.status(204);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
}