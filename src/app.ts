import express, { Application } from 'express'
import router from './app/routes'

const app:Application = express()


app.use(express.json())

app.use('/api', router)

// use route

app.get('/', (req, res) => {
  res.send('Hurry Car Rental server is Started')
})

export default app;