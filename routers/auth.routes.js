const express = require('express');
const registerUser = require('../controllers/auth.controller');

const Router = express.Router();

Router.post('/register',registerUser);

module.exports = Router;