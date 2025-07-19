require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.config');
const authRoutes = require('./routers/auth.routes');

connectDB();

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    console.log("App is running");
});

app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, ()=>{
    console.log("Server is running on port ", process.env.PORT);
});