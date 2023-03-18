import { User } from "./types/user";

interface Sessions {
	[key: string]: Pick<User, "email">;
}

export const sessions: Sessions = {};
