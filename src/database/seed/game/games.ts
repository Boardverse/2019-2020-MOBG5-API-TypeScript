import * as Sqlite3 from "sqlite3";

export async function games(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS games (
				gameId						INTEGER NOT NULL UNIQUE AUTOINCREMENT UNIQUE,
				gamePublishingDate			INTEGER,
				gameThumbnailURL			TEXT,
				gameMinPlayers				INTEGER,
				gameRecommendedPlayers		INTEGER,
				gameMaxPlayers				INTEGER,
				gameMinDuration				INTEGER,
				gameAverageDuration			INTEGER,
				gameMaxDuration				INTEGER,
				gameMinAge					INTEGER,
				gameRecommendedAge			INTEGER,
				gameMaxAge					INTEGER,
				PRIMARY KEY (gameId)
			);`,
			{},
			(err: Error) => {
				if (err) {
					reject(err);
				}
				resolve();
			});
	});
}
