import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import serverDb from "./db/conn";
import { userRouter } from "./routes/userRouter";

const PORT = process.env.PORT || 5000;

const app = express();

const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(userRouter);

const start = async () => {
	try {
		await serverDb.connectToDb();
		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		});
	} catch (error) {
		console.error(error);
	}
};

start();
