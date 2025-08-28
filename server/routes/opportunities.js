const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Opportunity = require('../models/Opportunity');
const User = require('../models/User');

// @route   GET api/opportunities
// @desc    Get all opportunities
// @access  Public
router.get('/', async (req, res) => {
  try {
    const opportunities = await Opportunity.find().populate('ngo', 'name');
    res.json(opportunities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/opportunities/:id
// @desc    Get opportunity by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id).populate('ngo', 'name');
    if (!opportunity) {
      return res.status(404).json({ msg: 'Opportunity not found' });
    }
    res.json(opportunity);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Opportunity not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/opportunities
// @desc    Create an opportunity
// @access  Private (NGOs only)
router.post('/', auth, async (req, res) => {
  // Check if user is an NGO
  if (req.user.role !== 'ngo') {
    return res.status(401).json({ msg: 'User not authorized' });
  }

  const { title, description, location, date, requiredSkills } = req.body;

  try {
    const newOpportunity = new Opportunity({
      title,
      description,
      location,
      date,
      requiredSkills,
      ngo: req.user.id,
    });

    const opportunity = await newOpportunity.save();
    res.json(opportunity);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/opportunities/:id
// @desc    Update an opportunity
// @access  Private (NGOs only)
router.put('/:id', auth, async (req, res) => {
    // Check if user is an NGO
  if (req.user.role !== 'ngo') {
    return res.status(401).json({ msg: 'User not authorized' });
  }

  const { title, description, location, date, requiredSkills } = req.body;

  // Build opportunity object
  const opportunityFields = {};
  if (title) opportunityFields.title = title;
  if (description) opportunityFields.description = description;
  if (location) opportunityFields.location = location;
  if (date) opportunityFields.date = date;
  if (requiredSkills) opportunityFields.requiredSkills = requiredSkills;

  try {
    let opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) return res.status(404).json({ msg: 'Opportunity not found' });

    // Make sure user owns opportunity
    if (opportunity.ngo.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    opportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      { $set: opportunityFields },
      { new: true }
    );

    res.json(opportunity);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   DELETE api/opportunities/:id
// @desc    Delete an opportunity
// @access  Private (NGOs only)
router.delete('/:id', auth, async (req, res) => {
    // Check if user is an NGO
  if (req.user.role !== 'ngo') {
    return res.status(401).json({ msg: 'User not authorized' });
  }

  try {
    let opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) return res.status(404).json({ msg: 'Opportunity not found' });

    // Make sure user owns opportunity
    if (opportunity.ngo.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Opportunity.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Opportunity removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   POST api/opportunities/:id/apply
// @desc    Apply for an opportunity
// @access  Private (Students only)
router.post('/:id/apply', auth, async (req, res) => {
  // Check if user is a student
  if (req.user.role !== 'student') {
    return res.status(401).json({ msg: 'User not authorized' });
  }

  try {
    const opportunity = await Opportunity.findById(req.params.id);

    // Check if already applied
    if (opportunity.applicants.filter(applicant => applicant.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'User already applied for this opportunity' });
    }

    opportunity.applicants.unshift(req.user.id);

    await opportunity.save();

    res.json(opportunity.applicants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
