import * as Sqlite3 from "sqlite3";

export async function gameLanguages(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS gameLanguages (
				gameId						INTEGER NOT NULL,
				languageId					INTEGER NOT NULL,
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
