import * as Sqlite3 from "sqlite3";

export async function userLogins(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS userLogins (
				userId						INTEGER NOT NULL,
				userToken					TEXT NOT NULL,
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
