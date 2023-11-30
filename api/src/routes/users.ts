import { Router } from "express";
import { createUser, deleteUserForId, getUsers } from "../controllers";

const userRouter = Router();

userRouter.post("/create", createUser);
userRouter.get("/get-all", getUsers);
userRouter.delete("/delete", deleteUserForId);

export { userRouter };
