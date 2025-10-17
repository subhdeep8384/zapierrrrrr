import express from 'express'
import { userRouter } from './routers/userRouter';
import { zapRouter } from './routers/zapRouter';
import cookieParser from "cookie-parser";
import cors from 'cors'
import { triggerRouter } from './routers/triggerRouter';
import { actionRouter } from './routers/action';

const app = express()
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,              
}))
app.use(express.json())
app.use('/api/v1/user', userRouter) ;
app.use('/api/v1/zap', zapRouter);
app.use('/api/v1/triggers' , triggerRouter) ;
app.use('/api/v1/actions' , actionRouter) ;



const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})