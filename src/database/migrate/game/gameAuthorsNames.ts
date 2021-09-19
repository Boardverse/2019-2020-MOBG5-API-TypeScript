import * as Sqlite3 from "sqlite3";

export async function gameAuthorsNames(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS gameAuthorsNames (
				gameAuthorId				INTEGER NOT NULL UNIQUE,
				gameAuthorName				TEXT NOT NULL,
				PRIMARY KEY (gameAuthorId)
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
