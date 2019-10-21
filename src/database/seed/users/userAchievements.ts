import * as Sqlite3 from "sqlite3";

export async function userAchievements(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS userAchievements (
				userId						INTEGER NOT NULL,
				userAchievementsId			INTEGER NOT NULL,
				userAchievementTimestamp	INTEGER NOT NULL,
				PRIMARY KEY (userId, userAchievementsId)
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
