const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Cargar variables de entorno desde .env
dotenv.config();

const app = express();
// Middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
 
// Routes
app.use('/api/v1/products', verifyToken, productRoutes(productController));
 

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server!' });
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;


// Start Server
app.listen(port, () => {
  console.log(`E-commerce server running on port ${port}`);
});