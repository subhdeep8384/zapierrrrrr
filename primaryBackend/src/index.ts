import express from 'express'
import { userRouter } from './routers/userRouter';
import { zapRouter } from './routers/zapRouter';
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express()
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use('/api/v1/user', userRouter) ;
app.use('/api/v1/zap', zapRouter);



const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})