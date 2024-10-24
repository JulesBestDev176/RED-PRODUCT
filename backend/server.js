import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import deviseRoutes from "./routes/deviseRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://red-product-frontend-peach.vercel.app",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"], // Méthodes autorisées
    credentials: true, // Autorise les cookies
  })
);
app.use(helmet());
app.use(cookieParser());
// Middleware pour traiter les données JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur !");
});
app.use("/api", userRoutes);
app.use("/api", deviseRoutes);
app.use("/api", hotelRoutes);

app.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log(
    `Server started at ${
      process.env.PORT ? "on assigned port" : "http://localhost:5000"
    }`
  );
});
