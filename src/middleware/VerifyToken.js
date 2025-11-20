const jsonwebtoken = require("jsonwebtoken");

const VerifyToken = (req, res, next) => {



  const token = req.headers['authorization']?.split(' ')[1];



  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }


  jsonwebtoken.verify(token, process.env.JWT_SECRET || "your_secret_key", (err, decoded) => {
    if (err) {
      const errorMessage = err.name === 'TokenExpiredError' 
        ? 'Token has expired' 
        : 'Invalid token';
      return res.status(401).json({ message: errorMessage });
    }

    next();
  });
};

module.exports = { VerifyToken };