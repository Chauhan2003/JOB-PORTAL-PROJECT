import express from "express";
import {
  deleteAccount,
  loginUser,
  logout,
  registerUser,
} from "../controllers/user.controller.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/delete-account").post(deleteAccount);

export default router;
