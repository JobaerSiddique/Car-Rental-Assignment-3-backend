import express, { Application } from 'express'
import router from './app/routes'
import globalErrorHandler from './app/middleware/globalHandlerError'
import notFound from './app/middleware/notFound'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app:Application = express()


app.use(express.json())



// Define allowed origins
const allowedOrigins = ['http://localhost:5173']; // Add other origins as needed

// Configure CORS
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow cookies to be sent
}));





app.use((req, res, next) => {
  console.log('Origin:', req.headers.origin);
  console.log('CORS Headers:', res.get('Access-Control-Allow-Origin'));
  next();
});
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