const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config');
const authRoutes = require('./routers/auth.routes');

dotenv.config();
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