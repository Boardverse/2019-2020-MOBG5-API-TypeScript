import { GameAuthor } from "./GameAuthor";
import { GameAward } from "./GameAward";
import { GameCategory } from "./GameCategory";
import { GamePicture } from "./GamePicture";
import { GameType } from "./GameType";
import { Language } from "./Language";
import { Publisher } from "./Publisher";

export interface Game {
	gameId: number;

	gameName: string;
	gameTypes: GameType[];
	gameCategories: GameCategory[];

	gameDescription: string;
	gameScore: number;

	gameThumbnailURL: URL;
	gamePicturesURL: GamePicture[];

	gamePublishers: Publisher[];
	gamePublishingDate: number;
	gameAuthors: GameAuthor[];

	gameMinPlayers: number;
	gameRecommendedPlayers: number;
	gameMaxPlayers: number;

	gameMinDuration: number;
	gameAverageDuration: number;
	gameMaxDuration: number;

	gameMinAge: number;
	gameRecommendedAge: number;
	gameMaxAge: number;

	gameAwards: GameAward[];
	gameLanguages: Language[];
}
