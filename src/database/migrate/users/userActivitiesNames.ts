import * as Sqlite3 from "sqlite3";

export async function userActivitiesNames(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS userActivitiesNames (
				userActivityType			INTEGER NOT NULL,
				languageId					INTEGER NOT NULL,
				userActivityName			TEXT,
				PRIMARY KEY (userActivityType, languageId)
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
