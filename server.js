const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
app.get('/',()=>{
    console.log("App is running");
})

app.listen(process.env.PORT, ()=>{
    console.log("Server is running on port ", process.env.PORT);
});