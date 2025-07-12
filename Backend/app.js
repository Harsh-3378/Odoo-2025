// import dependencies
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();
// 📁 Import Routes
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js'
import productRoutes from './src/routes/productRoutes.js';
import purchaseRoutes from './src/routes/purchaseRoutes.js';
// 🚀 Initialize Express App
const app = express();


app.use(express.json());

// 🌍 CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true); // allow all origins
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// 🛡️ Request Logger (for debugging and insight)
app.use((req, res, next) => {
  const now = new Date().toLocaleString('en-IN');
  console.log(`→_→ 🚀📧 [${now}] ${req.method} request to 🔗 ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Server is up and running like a dream machine!');
});

app.use('/api/auth', authRoutes); // 🔐 Authentication Routes
app.use('/api/user', userRoutes); 
app.use('/api/product', productRoutes); //
app.use('/api/purchase', purchaseRoutes); //

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found - perhaps lost in space.',
  });
});

app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err.stack || err);
  res.status(500).json({
    success: false,
    message: '💥 Server Error - we’re working on it.',
  });
});

export default app;
