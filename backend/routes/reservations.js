import express from 'express';
import { validationResult, body } from 'express-validator';
import Reservation from '../models/Reservation.js';

const router = express.Router();

// Validation middleware
const validateReservation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('time').notEmpty().withMessage('Time is required'),
  body('guests').isInt({ min: 1, max: 10 }).withMessage('Guests must be between 1-10'),
];

// GET all reservations (admin only)
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1 });
    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET single reservation by ID
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        error: 'Reservation not found',
      });
    }
    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// CREATE new reservation
router.post('/', validateReservation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const { name, email, phone, date, time, guests, requests } = req.body;

    // Check if slot is available
    const existingReservation = await Reservation.findOne({
      date: new Date(date),
      time: time,
      status: { $ne: 'cancelled' },
    });

    if (existingReservation) {
      return res.status(409).json({
        success: false,
        error: 'This time slot is already booked. Please choose another time.',
      });
    }

    const reservation = new Reservation({
      name,
      email,
      phone,
      date: new Date(date),
      time,
      guests,
      requests,
    });

    await reservation.save();

    res.status(201).json({
      success: true,
      message: 'Reservation confirmed! We will see you soon.',
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// UPDATE reservation
router.put('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!reservation) {
      return res.status(404).json({
        success: false,
        error: 'Reservation not found',
      });
    }

    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// CANCEL reservation
router.delete('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({
        success: false,
        error: 'Reservation not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Reservation cancelled successfully',
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET available time slots for a date
router.get('/available-slots/:date', async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const bookedSlots = await Reservation.find({
      date: {
        $gte: new Date(date.setHours(0, 0, 0)),
        $lt: new Date(date.setHours(24, 0, 0)),
      },
      status: { $ne: 'cancelled' },
    });

    const allSlots = [
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
    ];

    const bookedTimes = bookedSlots.map(r => r.time);
    const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));

    res.status(200).json({
      success: true,
      availableSlots,
      bookedSlots: bookedTimes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
