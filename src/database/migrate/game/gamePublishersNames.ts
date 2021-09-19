import * as Sqlite3 from "sqlite3";

export async function gamePublishersNames(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS gamePublishersNames (
				gamePublisherId				INTEGER NOT NULL UNIQUE,
				gamePublisherName			TEXT,
				PRIMARY KEY (gamePublisherId)
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
