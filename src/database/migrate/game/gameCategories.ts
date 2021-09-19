import * as Sqlite3 from "sqlite3";

export async function gameCategories(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS gameCategories (
				gameId						INTEGER NOT NULL,
				gameCategoryId				INTEGER NOT NULL,
				PRIMARY KEY (gameId, gameCategoryId)
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
