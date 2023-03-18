"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conn_1 = __importDefault(require("../db/conn"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const memory_1 = require("../memory");
class UserController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const usersCollection = conn_1.default.getDb().collection("users");
                const user = yield usersCollection.findOne({ email });
                if (user) {
                    res.status(409).json("This email is already taken");
                    return;
                }
                const hashSalt = bcryptjs_1.default.genSaltSync(10);
                const hashedPassword = bcryptjs_1.default.hashSync(password, hashSalt);
                const newUser = { email, password: hashedPassword };
                yield usersCollection.insertOne(newUser);
                const sessionId = (0, uuid_1.v4)();
                memory_1.sessions[sessionId] = { email };
                res.set("Set-Cookie", `session=${sessionId}`);
                res.json("You signed up successfully");
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    logIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const usersCollection = conn_1.default.getDb().collection("users");
                const user = yield usersCollection.findOne({ email });
                if (!user) {
                    res.status(401).json("Email is not correct");
                    return;
                }
                const userHashedPssword = user.password;
                const passwordIsValid = bcryptjs_1.default.compareSync(password, userHashedPssword);
                if (!passwordIsValid) {
                    res.status(401).json("Password is not correct");
                    return;
                }
                const sessionId = (0, uuid_1.v4)();
                memory_1.sessions[sessionId] = { email };
                res.set("Set-Cookie", `session=${sessionId}`);
                res.json("You logged in successfully");
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    logOut(req, res) {
        var _a;
        const sessionId = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split("=")[1];
        if (sessionId && sessionId in memory_1.sessions) {
            delete memory_1.sessions[sessionId];
            res.set("Set-Cookie", "sessions=; expires=Thu, 01 Jan 1970 00:00:00 GMT");
            res.json("You logged out successfully");
        }
        else {
            res.status(409).json("Conflict behavior");
        }
    }
}
exports.default = new UserController();
