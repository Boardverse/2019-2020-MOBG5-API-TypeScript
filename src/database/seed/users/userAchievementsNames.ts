import * as Sqlite3 from "sqlite3";

export async function userAchievementsNames(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS userAchievementsNames (
				userAchievementsId			INTEGER NOT NULL,
				languageId					INTEGER NOT NULL,
				userAchievementsNames		TEXT,
				PRIMARY KEY (userAchievementsId, languageId)
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
