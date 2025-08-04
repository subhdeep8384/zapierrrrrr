import express from 'express'

const app = express()

app.use(express.json())
app.use('/api/v1/user', userRouter) ;
app.use('/api/vi/zap',zapRouter);



const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})