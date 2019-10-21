import * as Sqlite3 from "sqlite3";

export async function gameAwards(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS gameAwards (
				gameId						INTEGER NOT NULL,
				gameAwardId					INTEGER NOT NULL,
				gameAwardYear				INTEGER,
				PRIMARY KEY (gameId, gameAwardId)
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
