const express = require('express');
const routes = express.Router();
const authController = require('../controllers/authController');
const { verifyAccessToken } = require('../helpers/auth');


// Authentication Routes
routes.post('/register', authController.register); // User Registration
routes.post('/login', authController.login); // User Login

module.exports = routes;
