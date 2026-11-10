const express = require('express');
const router = express.Router();
const students = require('../data/students');

// GET /students - get all students
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

// GET /students/:id - get a single student
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${id} not found`
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

// POST /students - create a new student
router.post('/', (req, res) => {
  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({
      success: false,
      message: 'Name and course are required fields'
    });
  }

  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name,
    course
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: 'Student created successfully',
    data: newStudent
  });
});

// PUT /students/:id - update an existing student
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, course } = req.body;

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${id} not found`
    });
  }

  if (!name && !course) {
    return res.status(400).json({
      success: false,
      message: 'Provide at least one field (name or course) to update'
    });
  }

  if (name) student.name = name;
  if (course) student.course = course;

  res.status(200).json({
    success: true,
    message: 'Student updated successfully',
    data: student
  });
});

// DELETE /students/:id - remove a student
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${id} not found`
    });
  }

  const deletedStudent = students.splice(index, 1);

  res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
    data: deletedStudent[0]
  });
});

module.exports = router;
