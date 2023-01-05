import express from "express";
import { login, logout, customerregister,adminregister } from "../controller/auth.js";

const authRouter = express.Router()

authRouter.post("/customerregister", customerregister)
authRouter.post("/adminregister", adminregister)
authRouter.post("/login", login)
authRouter.post("/logout", logout)


export default authRouter