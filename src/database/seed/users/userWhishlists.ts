import * as Sqlite3 from "sqlite3";

export async function userWishlists(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS userWishlists (
				userId							INTEGER NOT NULL,
				gameId							INTEGER NOT NULL,
				userWishlistAddedTimestamp		INTEGER NOT NULL,
				PRIMARY KEY (userId, gameId)
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
