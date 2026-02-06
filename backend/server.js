import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/db.js';
import userRouter from './routes/authRoutes.js';

// app config
const app = express();
const port = process.env.PORT || 4000;

connectDb()

//middleware
app.use(express.json())
app.use(cors())

// api endpoint
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
  res.send("Api working great")
})

app.listen(port, ()=> console.log("server  strted",port))

