import * as Sqlite3 from "sqlite3";

export async function gameTypes(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS gameTypes (
				gameId						INTEGER NOT NULL,
				gameTypeId					INTEGER NOT NULL,
				PRIMARY KEY (gameId, gameTypeId)
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
