import User from "../models/user.model.js";
import { compareHash, hashString } from "../utils/bcryptHandling.js";
import {
  sendDeleteAccountEmail,
  sendVarificationEmail,
} from "../utils/sendMail.js";
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

  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Invalid phone number",
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
        message: "User does not exist",
      });
    }

    const passwordMatch = await compareHash(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (user.verified === false) {
      return res.status(401).json({
        success: false,
        message: "User is not verified",
      });
    }

    const token = generateToken(
      {
        userId: user._id,
        email: user.email,
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

    res.cookie("jobPortal", token, {
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

export const logout = (req, res) => {
  try {
    res.clearCookie("jobPortal");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};

export const deleteAccount = async (req, res) => {
  const { userId, email } = req.user;

  try {
    await User.findByIdAndDelete(userId);
    res.clearCookie("jobPortal");

    try {
      await sendDeleteAccountEmail({ email });

      return res.status(200).json({
        success: true,
        message: "Account deleted successfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Unable to send delete account confirmation email",
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

export const updateProfile = async (req, res) => {
  const { userId } = req.user;
  // const file = req.file;

  const updateData = {};

  if (req.body.fullName) updateData.fullName = req.body.fullName;
  if (req.body.phone) updateData.phone = req.body.phone;
  if (req.body.bio) updateData.bio = req.body.bio;
  if (req.body.skills) updateData.skills = req.body.skills.split(",");

  try {
    // yeha cloudinary aye ga

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    // yeha hm resume ko add kre ge

    const resUser = {
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      profile: updatedUser.profile,
    };

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
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
