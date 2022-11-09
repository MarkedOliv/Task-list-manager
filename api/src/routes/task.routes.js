const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.send('retrieving a list of tasks');
});
router.get('/:id', (req, res) => {
    res.send('retrieving a single task');
});
router.post('/', (req, res) => {
    res.send('creating a new task');
});
router.put('/:id', (req, res) => {
    res.send('updating a task');
});
router.delete('/:id', (req, res) => {
    res.send('deleting a task');
});

module.exports = router;