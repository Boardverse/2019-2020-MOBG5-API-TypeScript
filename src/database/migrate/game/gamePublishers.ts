import * as Sqlite3 from "sqlite3";

export async function gamePublishers(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS gamePublishers (
				gameId						INTEGER NOT NULL,
				gamePublisherId				INTEGER NOT NULL,
				PRIMARY KEY (gameId, gamePublisherId)
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
