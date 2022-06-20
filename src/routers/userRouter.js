import express from 'express';
import { see, logout, getEdit, postEdit, getChangePassword, postChangePassword } from '../controllers/userController';
import { protectorMiddleware } from '../middlewares';

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.route("/change-password").get(getChangePassword).post(postChangePassword);
userRouter.get("/:id", see);

export default userRouter;