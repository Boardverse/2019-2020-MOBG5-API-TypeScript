import { GameAward } from "./GameAward";
import { GameCategory } from "./GameCategory";
import { GamePicture } from "./GamePicture";
import { GameType } from "./GameType";
import { Language } from "./Language";
import { Publisher } from "./Publisher";

export interface Game {
	id: number;

	name: string;
	types: GameType[];
	categories: GameCategory[];

	description: string;
	score: number;

	thumbnailURL: string;
	picturesURL: GamePicture[];

	publishers: Publisher[];
	publishingDate: number;

	minPlayers: number;
	recommendedPlayers: number;
	maxPlayers: number;

	minDuration: number;
	averageDuration: number;
	maxDuration: number;

	minAge: number;
	recommendedAge: number;
	maxAge: number;

	awards: GameAward[];
	languages: Language[];
}
