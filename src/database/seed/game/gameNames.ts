import * as Sqlite3 from "sqlite3";

export async function gameNames(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS gameNames (
				gameId						INTEGER NOT NULL,
				languageId					INTEGER NOT NULL,
				gameName					TEXT,
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
