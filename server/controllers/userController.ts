import { Request, Response } from "express";
import serverDb from "../db/conn";
import { User } from "../types/user";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { sessions } from "../memory";

class UserController {
	async signUp(req: Request, res: Response): Promise<void> {
		console.log("start signUp");
		try {
			const { email, password } = req.body;
			const usersCollection = serverDb.getDb().collection<User>("users");
			const user = await usersCollection.findOne({ email });
			if (user) {
				res.status(409).json("This email is already taken");
				console.log(sessions);
				return;
			}
			const hashSalt = await bcrypt.genSalt();
			const hashedPassword = await bcrypt.hash(password, hashSalt);
			const newUser: User = { email, password: hashedPassword };
			await usersCollection.insertOne(newUser);
			const sessionId = uuidv4();
			sessions[sessionId] = { email };
			res.set("Set-Cookie", `session=${sessionId}; max-age=600`);
			res.json("You signed up successfully");
			console.log(sessions);
		} catch (error: any) {
			res.status(500).json(error);
		}
	}

	async logIn(req: Request, res: Response): Promise<void> {
		console.log("start logIn");
		try {
			const { email, password } = req.body;
			const usersCollection = serverDb.getDb().collection<User>("users");
			const user = await usersCollection.findOne({ email });
			if (!user) {
				res.status(401).json("Email is not correct");
				console.log(sessions);
				return;
			}
			const userHashedPssword = user.password;
			const passwordIsValid = await bcrypt.compare(
				password,
				userHashedPssword
			);
			if (!passwordIsValid) {
				res.status(401).json("Password is not correct");
				return;
			}
			const sessionId = uuidv4();
			sessions[sessionId] = { email };
			res.set("Set-Cookie", `session=${sessionId}; max-age=600`);
			res.json("You logged in successfully");
			console.log(sessions);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	logOut(req: Request, res: Response): void {
		console.log("start logOut");
		const sessionId = req.headers.cookie?.split(";")[2].split("=")[1];
		console.log(sessionId);

		if (sessionId && sessionId in sessions) {
			delete sessions[sessionId];
			res.set(
				"Set-Cookie",
				"sessions=; expires=Thu, 01 Jan 1970 00:00:00 GMT"
			);

			res.json("You logged out successfully");
		} else {
			res.status(409).json("Conflict behavior");
		}
		console.log(sessions);
	}

	checkAuth(req: Request, res: Response): void {
		console.log("start checkAuth");
		const sessionId = req.headers.cookie?.split(";")[2]?.split("=")[1];

		if (sessionId && sessionId in sessions) {
			res.json("Authorized");
		} else {
			res.json("Unauthorized");
		}
	}
}

export default new UserController();
