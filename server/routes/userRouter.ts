import { Router } from "express";
import userController from "../controllers/userController";

const userRouter = Router();

/* userRouter.post("/sign-up", (req, res) => {
	console.log(req.body);
	res.send("POST my req");
}); */
userRouter.post("/sign-up", userController.signUp);
userRouter.post("/log-in", userController.logIn);
userRouter.post("/log-out", userController.logOut);
userRouter.post("/auth", userController.checkAuth);

export { userRouter };
