const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      msg: "No token found in Authorization header"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {

    if(error.name==="TokenExpiredError"){
        return res.status(401).json({
      msg:"Token expired"
        })
    }
    return res.status(403).json({
      msg: "Invalid token"
    });
  }
};

module.exports = { authMiddleware };
