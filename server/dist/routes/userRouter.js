"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
/* userRouter.post("/sign-up", (req, res) => {
    console.log(req.body);
    res.send("POST my req");
}); */
userRouter.post("/sign-up", userController_1.default.signUp);
userRouter.post("/log-in", userController_1.default.logIn);
userRouter.get("/log-out", userController_1.default.logOut);
userRouter.post("/auth", () => { });
