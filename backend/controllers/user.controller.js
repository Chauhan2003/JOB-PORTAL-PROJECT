import User from "../models/user.model.js";
import { compareHash, hashString } from "../utils/bcryptHandling.js";
import { sendVarificationEmail } from "../utils/sendMail.js";
import { generateToken } from "../utils/tokenHandling.js";

export const registerUser = async (req, res) => {
  const { fullName, email, phone, password, role } = req.body;
  if (!fullName || !email || !phone || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await hashString(password);

    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    try {
      await sendVarificationEmail(newUser);
      await newUser.save();
      return res.status(200).json({
        success: true,
        message: "Verify your email address",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Registeration failed",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await compareHash(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(
      {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      },
      "2d"
    );

    const resUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profile: user.profile,
    };

    res.cookie("job-portal", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 4 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: `Welcome ${user.fullName}`,
      user: resUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};
