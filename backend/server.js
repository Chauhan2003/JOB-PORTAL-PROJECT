import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import dbConnection from "./database/index.js";
import userRoutes from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import dotnev from "dotenv";
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

// Routes:-
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
