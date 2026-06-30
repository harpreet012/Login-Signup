const jwt = require("jsonwebtoken");

const secretKey = "acharya";

const auth = (req, res, next) => {
  try {
    // Authorization Header
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required.",
      });
    }

    // Check Bearer Token format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid Authorization format. Use: Bearer <token>",
      });
    }

    // Extract Token
    const token = authHeader.split(" ")[1];

    // Verify Token
    const decoded = jwt.verify(token, secretKey);

    // Store decoded user details
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token.",
    });
  }
};

module.exports = auth;
