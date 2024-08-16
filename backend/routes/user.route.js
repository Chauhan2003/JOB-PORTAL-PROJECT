import express from "express";
import {
  deleteAccount,
  loginUser,
  logout,
  registerUser,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(isAuthenticated, logout);
router.route("/delete-account").get(isAuthenticated, deleteAccount);
router.route("/profile/update").put(isAuthenticated, updateProfile);

export default router;
