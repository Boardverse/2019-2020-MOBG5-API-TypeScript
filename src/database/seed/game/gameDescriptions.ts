import * as Sqlite3 from "sqlite3";

export async function gameDescriptions(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS gameDescriptions (
				gameId						INTEGER NOT NULL,
				languageId					INTEGER NOT NULL,
				gameDescription				TEXT,
				PRIMARY KEY (gameId, languageId)
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
