import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import dotnev from "dotenv";
import dbConnection from "./database/index.js";
dotnev.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware:-
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

dbConnection();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
