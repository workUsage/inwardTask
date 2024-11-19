const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const ExcelJS = require('exceljs'); 
const router = express.Router();

// Create a new task
router.post('/', auth, async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all tasks
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'username');
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get tasks for a specific user
router.get('/user', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update task status
router.put('/:id/:action', auth, async (req, res) => {
  try {
    const { id, action } = req.params;
    const { forwardTo } = req.body;
    let task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    switch (action) {
      case 'accept':
        task.status = 'accepted';
        break;
      case 'complete':
        task.status = 'completed';
        break;
      case 'fail':
        task.status = 'failed';
        break;
      case 'forward':
        task.assignedTo = forwardTo;
        break;
      default:
        return res.status(400).json({ msg: 'Invalid action' });
    }
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Export tasks to Excel
router.get('/export', auth, async (req, res) => {
    try {
      const tasks = await Task.find().populate('assignedTo', 'username');
  
      const workbook = new ExcelJS.Workbook(); // Update this line
      const worksheet = workbook.addWorksheet('Tasks');
  
      worksheet.columns = [
        { header: 'Inward No', key: 'inwardNo', width: 15 },
        { header: 'Subject', key: 'subject', width: 30 },
        { header: 'Description', key: 'description', width: 50 },
        { header: 'Start Date', key: 'startDate', width: 15 },
        { header: 'End Date', key: 'endDate', width: 15 },
        { header: 'Assigned To', key: 'assignedTo', width: 20 },
        { header: 'Status', key: 'status', width: 15 },
      ];
  
      tasks.forEach(task => {
        worksheet.addRow({
          inwardNo: task.inwardNo,
          subject: task.subject,
          description: task.description,
          startDate: task.startDate.toLocaleDateString(),
          endDate: task.endDate.toLocaleDateString(),
          assignedTo: task.assignedTo ? task.assignedTo.username : 'Unassigned',
          status: task.status,
        });
      });
  
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=tasks.xlsx');
  
      await workbook.xlsx.write(res);
      res.end();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;