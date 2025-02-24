const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  package: Number,
  experienceRequired: String,
  description: String,
  premiumOnly: Boolean
});

const Job = mongoose.model('Job', jobSchema);

// GET jobs (filtered by membership)
router.get('/', async (req, res) => {
  const isPremium = req.query.premium === 'true';
  try {
    const jobs = isPremium ? await Job.find() : await Job.find({ premiumOnly: false });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// POST a new job
router.post('/', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.json({ message: 'Job posted successfully!', job });
  } catch (err) {
    res.status(500).json({ message: 'Error posting job' });
  }
});

// PUT (Update) job
router.put('/:id', async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job updated successfully!', updatedJob });
  } catch (err) {
    res.status(500).json({ message: 'Error updating job' });
  }
});

// DELETE job
router.delete('/:id', async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting job' });
  }
});

module.exports = router;