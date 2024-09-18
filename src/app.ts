import express, { Application } from 'express'
import router from './app/routes'
import globalErrorHandler from './app/middleware/globalHandlerError'
import notFound from './app/middleware/notFound'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app:Application = express()


app.use(express.json())



// Define allowed origins
const allowedOrigins = ['http://localhost:5173','https://66eb2f3a7ae6548f66cde6de--dapper-nasturtium-bce1b7.netlify.app','https://car-rentals-client-assign-5-s32v.vercel.app']; 

// Configure CORS
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));






app.use(cookieParser())

app.use('/api', router)

// use route
app.use(globalErrorHandler)
app.get('/', (req, res) => {
  res.send('Hurry Car Rental server is Started')
})
// not found route
app.use(notFound)


export default app;