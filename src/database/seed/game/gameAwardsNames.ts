import * as Sqlite3 from "sqlite3";

export async function gameAwardsNames(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS gameAwardsNames (
				gameAwardId					INTEGER NOT NULL AUTOINCREMENT UNIQUE,
				gameAwardName				TEXT,
				PRIMARY KEY (gameAwardId)
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
