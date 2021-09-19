import { Game } from "./Game";
import { UserGameAchievement } from "./GameAchievement";
import { UserGameReview } from "./GameReview";

export interface User {
	id: number;
	name: string;
	joinedTimestamp: number;
	iconURL: string;

	friends: User[];

	collection: Game[];
	wishlist: Game[];
	played: Game[];
	reviews: UserGameReview[];
	achievements: UserGameAchievement[];
}
