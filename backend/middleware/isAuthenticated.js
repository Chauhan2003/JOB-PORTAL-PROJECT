import { verifyToken } from "../utils/tokenHandling.js";

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.jobPortal;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }

  try {
    const decode = verifyToken(token);
    req.user = decode;
    
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};

export default isAuthenticated;
