const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  inwardNo: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'completed', 'failed'], default: 'pending' }
});

module.exports = mongoose.model('Task', TaskSchema);