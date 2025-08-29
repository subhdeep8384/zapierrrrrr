import express from 'express'
import { userRouter } from './routers/userRouter';
import { zapRouter } from './routers/zapRouter';
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/v1/user', userRouter) ;
app.use('/api/vi/zap',zapRouter);



const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})