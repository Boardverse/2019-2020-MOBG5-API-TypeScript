import * as Sqlite3 from "sqlite3";

export async function gameTypesNames(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS gameTypesNames (
				gameTypeId					INTEGER NOT NULL,
				languageId					INTEGER NOT NULL,
				gameTypeName				TEXT,
				PRIMARY KEY (gameTypeId, languageId)
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
