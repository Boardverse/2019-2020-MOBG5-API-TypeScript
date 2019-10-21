import { Achievement } from "./Achievement";
import { Game } from "./Game";
import { Review } from "./Review";

export interface User {
	id: number;
	name: string;
	joinedTimestamp: number;
	icon: URL;

	friends: User[];

	collection: Game[];
	whishlist: Game[];
	played: Game[];
	reviews: Review[];
	achievements: Achievement[];
}
