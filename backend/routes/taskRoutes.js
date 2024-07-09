const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', verifyToken, taskController.getTasks);
router.post('/', verifyToken, taskController.createTask);

module.exports = router;
