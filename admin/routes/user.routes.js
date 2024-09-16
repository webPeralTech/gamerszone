// admin/routes/admin.routes.js
const express = require('express');
const { login, createAdmin } = require('../controllers/user.controller');

const router = express.Router();

router.post('/login', login);
router.post('/create-admin', createAdmin);

module.exports = router;
