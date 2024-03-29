const express=require('express')
const colors=require('colors');
const moragan=require('morgan')
const dotenv=require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');


//dotenv config
dotenv.config()
//rest object
const app=express()

//middlewares
app.use(express.json())
app.use(morgan("dev"))
//bomgodb
connectDB()

//rouytes .
app.use("/api/v1/user/", require("./routes/userRoute"));


const port=process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`server running in ${process.env.PORT}`);
})