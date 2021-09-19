import * as Sqlite3 from "sqlite3";

export async function gameAuthors(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS gameAuthors (
				gameId						INTEGER NOT NULL,
				gameAuthorId				INTEGER NOT NULL,
				PRIMARY KEY (gameId, gameAuthorId)
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
