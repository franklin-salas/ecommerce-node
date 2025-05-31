const express = require('express');
const config = require('./config');
const MongoProductRepository = require('./infraestructure/repositories/MongoProductRepository');
const ProductController = require('./adapters/controllers/ProductController');
const productRoutes = require('./adapters/routes/productRoutes');
const { verifyToken } = require('./adapters/middlewares/authJwt');

const app = express();
const port = config.port;

// Dependencies
const productRepository = new MongoProductRepository();
const productController = new ProductController(productRepository);

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