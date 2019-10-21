import * as Sqlite3 from "sqlite3";

export async function gameCategoriesNames(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS gameCategoriesNames (
				gameCategoryId				INTEGER NOT NULL,
				languageId					INTEGER NOT NULL,
				gameCategoryName			TEXT,
				PRIMARY KEY (gameCategoryId, languageId)
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
