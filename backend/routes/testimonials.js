import express from 'express';
import Testimonial from '../models/Testimonial.js';

const router = express.Router();

// GET all approved testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true, featured: true }).limit(10);
    
    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET all testimonials (admin)
router.get('/admin/all', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// CREATE new testimonial
router.post('/', async (req, res) => {
  try {
    const { text, author, location, rating, email } = req.body;
    
    const testimonial = new Testimonial({
      text,
      author,
      location,
      rating,
      email,
      approved: false, // Will be approved by admin
    });
    
    await testimonial.save();
    
    res.status(201).json({
      success: true,
      message: 'Thank you for your review! It will be published after approval.',
      data: testimonial,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// UPDATE testimonial (admin - approve/feature)
router.put('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE testimonial (admin)
router.delete('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
