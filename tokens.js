require("dotenv").config();
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No tokens were provided" });
  }
  const verification = jwt.verify(
    token,
    process.env.SECRET_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.userId = decoded.id;
      next();
    }
  );
}

const authenticateToken = (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("Authentication error: Token missing"));
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(new Error("Authentication error: Invalid token"));
    }

    socket.userId = decoded.id;
    next();
  });
};

module.exports = {
  verifyToken,
  authenticateToken,
};
