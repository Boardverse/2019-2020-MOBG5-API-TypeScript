import * as Sqlite3 from "sqlite3";

export async function gameAwards(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS gameAwards (
				gameAwardId					INTEGER NOT NULL,
				gameAwardYear				INTEGER NOT NULL,
				gameId						INTEGER NOT NULL,
				PRIMARY KEY (gameAwardId, gameAwardYear)
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
