import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/db.js';
import issueRouter from './routes/issueRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

// app config
const app = express();
const port = process.env.PORT || 4000;

connectDb()

//middleware
app.use(express.json())
// app.use(cors())
app.use(cors({
  origin: "https://issue-flow-ebon.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


// api endpoint
app.use('/api/auth',authRouter)
app.use('/api/issue',issueRouter)
app.use('/api/user',userRouter )

app.get('/',(req,res)=>{
  res.send("Api working great")
})
// app.listen(port, ()=> console.log("server  strted",port))
export default app
