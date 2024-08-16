import jwt from "jsonwebtoken";

export const generateToken = (payload, expiresIn = "1h") => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn,
    });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
  }
};
