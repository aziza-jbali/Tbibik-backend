import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import  connectdb from "./src/config/db.js";
import usersRouter from "./src/routes/Usersrouter.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/users", usersRouter);

app.get("/api/health", (req, res) => {
    res.json({
        message: "Backend is running successfully!"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
connectdb(); // Connect to MongoDB
