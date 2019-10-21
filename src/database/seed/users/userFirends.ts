import * as Sqlite3 from "sqlite3";

export async function userFriends(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS userFriends (
				userId						INTEGER NOT NULL,
				userFriendUserId			INTEGER NOT NULL,
				PRIMARY KEY (userId, userFriendUserId)
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
