import express from "express";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// middlewares
app.use(express.json());
// app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.listen(5000, () => {
  console.log("server running on 5000");
});
