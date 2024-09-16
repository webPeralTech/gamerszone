// admin/controllers/admin.controller.js
const Admin = require('../models/user.model');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.login = async (req, res) => {
    const { email, password } = req.body;

    console.log("body", req.body)
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        console.log("admin", admin)
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if an admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Create new admin
        const newAdmin = new Admin({ email, password });
        await newAdmin.save();

        const token = jwt.sign({ id: newAdmin._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Admin created successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};