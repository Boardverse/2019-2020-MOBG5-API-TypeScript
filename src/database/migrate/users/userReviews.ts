import * as Sqlite3 from "sqlite3";

export async function userReviews(database: Sqlite3.Database): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`CREATE TABLE IF NOT EXISTS userReviews (
				userId						INTEGER NOT NULL,
				gameId						INTEGER NOT NULL,
				userReviewScore				INTEGER NOT NULL,
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
