import * as Sqlite3 from "sqlite3";

export async function users(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS users (
				userId						INTEGER NOT NULL UNIQUE AUTOINCREMENT UNIQUE,
				userName					TEXT NOT NULL UNIQUE,
				userPassword				TEXT NOT NULL,
				userJoinedTimestamp			INTEGER NOT NULL,
				userIconURL					TEXT,
				userLanguageId				INTEGER,
				PRIMARY KEY (userId)
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
