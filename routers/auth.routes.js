const express = require('express');
const {registerUser, loginUser} = require('../controllers/auth.controller');

const Router = express.Router();

Router.post('/register',registerUser);
Router.post('/login',loginUser);

module.exports = Router;