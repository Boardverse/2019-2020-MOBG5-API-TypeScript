import * as Sqlite3 from "sqlite3";

import { gameAuthors } from "./game/gameAuthors";
import { gameAuthorsNames } from "./game/gameAuthorsNames";
import { gameAwards } from "./game/gameAwards";
import { gameAwardsNames } from "./game/gameAwardsNames";
import { gameCategories } from "./game/gameCategories";
import { gameCategoriesNames } from "./game/gameCategoriesNames";
import { gameDescriptions } from "./game/gameDescriptions";
import { gameLanguages } from "./game/gameLanguages";
import { gameNames } from "./game/gameNames";
import { gamePictures } from "./game/gamePictures";
import { gamePublishers } from "./game/gamePublishers";
import { gamePublishersNames } from "./game/gamePublishersNames";
import { games } from "./game/games";
import { gameTypes } from "./game/gameTypes";
import { gameTypesNames } from "./game/gameTypesNames";
import { languages } from "./languages/languages";
import { userAchievements } from "./users/userAchievements";
import { userAchievementsNames } from "./users/userAchievementsNames";
import { userActivities } from "./users/userActivities";
import { userActivitiesNames } from "./users/userActivitiesNames";
import { userCollections } from "./users/userCollection";
import { userFriends } from "./users/userFirends";
import { userFriendsRequests } from "./users/userFriendsRequests";
import { userLogins } from "./users/userLogins";
import { userPlayed } from "./users/userPlayed";
import { userReviews } from "./users/userReviews";
import { users } from "./users/users";
import { userWishlists } from "./users/userWhishlists";

export async function seed(database: Sqlite3.Database): Promise<void> {
	await games(database)
		.then(() => gameNames(database))
		.then(() => gameDescriptions(database))
		.then(() => gameTypes(database))
		.then(() => gameTypesNames(database))
		.then(() => gameCategories(database))
		.then(() => gameCategoriesNames(database))
		.then(() => gamePictures(database))
		.then(() => gamePublishers(database))
		.then(() => gamePublishersNames(database))
		.then(() => gameAwards(database))
		.then(() => gameAwardsNames(database))
		.then(() => gameAuthors(database))
		.then(() => gameAuthorsNames(database))
		.then(() => gameLanguages(database))
		.then(() => languages(database))
		.then(() => users(database))
		.then(() => userFriends(database))
		.then(() => userFriendsRequests(database))
		.then(() => userCollections(database))
		.then(() => userWishlists(database))
		.then(() => userPlayed(database))
		.then(() => userReviews(database))
		.then(() => userAchievements(database))
		.then(() => userAchievementsNames(database))
		.then(() => userActivities(database))
		.then(() => userActivitiesNames(database))
		.then(() => userLogins(database))
		.catch((err: Error) => {
			process.stderr.write(`${err}\n`);
		});
}
