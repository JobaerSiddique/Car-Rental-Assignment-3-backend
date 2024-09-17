import express, { Application } from 'express'
import router from './app/routes'
import globalErrorHandler from './app/middleware/globalHandlerError'
import notFound from './app/middleware/notFound'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app:Application = express()


app.use(express.json())



app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.options('*', cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
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