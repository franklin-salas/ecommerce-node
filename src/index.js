const express = require('express');
const config = require('./config');
console.log('>>> Config leída:', config);
const MongoProductRepository    = require('./infraestructure/repositories/MongoProductRepository');
const MongoClientRepository     = require('./infraestructure/repositories/MongoClientRepository ');
const MongoBranchRepository     = require('./infraestructure/repositories/MongoBranchRepository');
const MySQLProductRepository    = require('./infraestructure/repositories/MySQLProductRepository');
const MongoUserRepository     = require('./infraestructure/repositories/MongoUserRepository');

const ClientController          = require('./adapters/controllers/ClientController');
const BranchController          = require('./adapters/controllers/BranchController');
const ProductController         = require('./adapters/controllers/ProductController');
const { verifyToken }           = require('./adapters/middlewares/authJwt');
const PasswordHasher            = require('./infraestructure/services/PasswordHasher');
const TokenGenerator            = require('./infraestructure/services/TokenGenerator');
const productRoutes             = require('./adapters/routes/productRoutes');
const clientRoutes              = require('./adapters/routes/clientRoutes');
const branchRoutes              = require('./adapters/routes/branchRoutes');

const SignIn                  = require('./application/useCases/SingnIn');
const RefreshToken                  = require('./application/useCases/RefreshToken');
const authRoutes              = require('./adapters/routes/authRoutes');
const userRoutes          = require('./adapters/routes/userRoutes');
const SignUp              = require('./application/useCases/SignUp');

const app = express();
const port = config.port;

// Dependencies
const dbType = config.DB_TYPE || 'mongodb'; // 'mongo' o 'mysql'
let productRepository;
console.log('>>> DB_TYPE:', dbType);
if (dbType === 'mysql') {
   productRepository = new MySQLProductRepository();
} else {
  productRepository = new MongoProductRepository();
}
let clientRepository = new MongoClientRepository();
let branchRepository = new MongoBranchRepository(); 


const productController = new ProductController(productRepository);
const clientController = new ClientController(clientRepository);
const branchController = new BranchController(branchRepository); 


// Middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
 
const userRepo       = new MongoUserRepository();
const passwordHasher = new PasswordHasher();
const tokenGen       = new TokenGenerator();
const signInUseCase  = new SignIn(userRepo, passwordHasher, tokenGen);
const refreshToken = new RefreshToken(tokenGen);
app.use('/api/v1/auth', authRoutes(signInUseCase));

const signUpUseCase = new SignUp(userRepo, passwordHasher);
app.use('/api/v1/users',express.json(),userRoutes(signUpUseCase));

// Routes
app.use('/api/v1/products', verifyToken, productRoutes(productController));
app.use('/api/v1/clients', verifyToken, clientRoutes(clientController));
app.use('/api/v1/branches', verifyToken, branchRoutes(branchController));
 

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server!' });
});


// Start Server
app.listen(port, () => {
  console.log(`E-commerce server running on port ${port}`);
});