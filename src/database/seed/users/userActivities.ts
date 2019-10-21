import * as Sqlite3 from "sqlite3";

export async function userActivities(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS userActivities (
				userId						INTEGER NOT NULL,
				userActivityId				INTEGER NOT NULL,
				userActivityType			INTEGER NOT NULL,
				userActivityValue			TEXT,
				userActivityTimestamp		INTEGER NOT NULL,
				PRIMARY KEY (userActivityId)
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
