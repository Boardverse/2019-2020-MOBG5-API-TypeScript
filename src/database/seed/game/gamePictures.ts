import * as Sqlite3 from "sqlite3";

export async function gamePictures(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS gamePictures (
				gamePictureId				INTEGER NOT NULL AUTOINCREMENT UNIQUE,
				gameId						INTEGER NOT NULL,
				gamePictureURL				TEXT,
				PRIMARY KEY (gamePictureId)
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
