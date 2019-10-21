import * as Sqlite3 from "sqlite3";

export async function languages(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS languages (
				languageId				INTEGER NOT NULL,
				languageIdInLanguageId	INTEGER NOT NULL,
				languageName				TEXT,
				PRIMARY KEY(languageId, languageIdInLanguageId)
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
