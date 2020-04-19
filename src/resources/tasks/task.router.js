const router = require('express').Router();
const taskService = require('./task.service');
const Task = require('./task.model');
const { catchErrors } = require('../../middlewares/');

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const { boardId } = req;
      const tasks = await taskService.getTasksByBoardId(boardId);
      res.status(200).json(tasks.map(Task.toResponse));
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const { boardId, body } = req;
      const task = await taskService.createNewTask(boardId, body);
      return res.status(200).json(Task.toResponse(task));
    })
  );

router
  .route('/:taskId')
  .get(
    catchErrors(async (req, res) => {
      const { taskId } = req.params;
      const task = await taskService.getTaskById(taskId);
      return res.status(200).json(Task.toResponse(task));
    })
  )
  .put(
    catchErrors(async (req, res, next) => {
      const { body } = req;
      const { taskId } = req.params;
      const task = await taskService.updateTaskById(taskId, body);
      if (task.ok === 1) {
        return res.status(200).json(Task.toResponse(task));
      }
      return next({ status: 404, message: 'Task not found' });
    })
  )
  .delete(
    catchErrors(async (req, res) => {
      const { taskId } = req.params;
      await taskService.deleteTask(taskId);
      res.status(204).json({ message: 'The task has been deleted' });
    })
  );

module.exports = router;
