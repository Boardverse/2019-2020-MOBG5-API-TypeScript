import * as crypto from "crypto";
import * as Sqlite3 from "sqlite3";

import * as Statements from "./../statements/statements";

/**
 * Returns the language user by the user specified by his userId
 * @param database the database to user
 * @param userId the id of the user to return the languageId from
 * @return a promise with the languageId of the user, if one
 */
export async function getLanguageId(database: Sqlite3.Database, userId: number): Promise<number|null> {
	return new Promise<number|null>((resolve, reject): void => {
		database.get(
			`
			SELECT userLanguageId AS languageId
			FROM users
			WHERE userId = $userId;
			`,
			{
				$userId: userId,
			},
			(err: Error | null, row: {languageId: number} | null): void => {
				if (err) {
					reject(err);
				}
				resolve(row ? row.languageId : null);
			});
	});
}

/**
 * Returns the userId of the user based on his connection token
 * @param database the database to use
 * @param token the connection token of the user
 * @return a promise with the id of the user, if one
 */
export async function getUserId(database: Sqlite3.Database, token: string): Promise<number|null> {
	return new Promise<number|null>((resolve, reject): void => {
		database.get(
			`
			SELECT userId
			FROM userLogins
			WHERE userToken = $token;
			`,
			{
				$token: token,
			}, (err: Error | null, row: {userId: number} | null) => {
				if (err) {
					reject(err);
				}
				resolve(row ? row.userId : null);
			});
	});
}

/**
 * Logs a user in if credentials are correct and creates a new login token
 * @param database the database to check
 * @param login the login provided
 * @param password the password provided
 * @returns a promise with the new connection token of the user if successfully connected
 */
export async function login(database: Sqlite3.Database, login: string, password: string): Promise<string> {
	// get details corresponding to userName
	return new Promise<{password: string, timestamp: number, userId: number}>((resolve, reject): void => {
		database.get(
			`
			SELECT 	userPassword AS password,
					userJoinedTimestamp AS timestamp,
					userId
			FROM users
			WHERE userName = $userName;
			`,
			{
				$userName: login,
			},
			(err: Error | null, row: {password: string, timestamp: number, userId: number} | null) => {
				if (err) {
					reject(err);
				}
				if (row === null) {
					reject("No such username");
				}
				resolve(row!);
			});
	})
	// if userName and pasword match, create token
	.then(async (a: {password: string, timestamp: number, userId: number}): Promise<{token: string, userId: number}> => {
		if (a.password !== crypto.createHash("sha256").update(password + a.timestamp.toString()).digest("hex")) {
			return Promise.reject("Login credentials don't match");
		}
		return Promise.resolve({token: crypto.randomBytes(32).toString("hex"), userId: a.userId});
	})
	// put token in the database
	.then(async (a: {token: string, userId: number}): Promise<string> => {
		const userAlreadyHasToken: boolean = await new Promise<boolean>((resolve, reject): void => {
			database.get(
				`
				SELECT *
				FROM userLogins
				WHERE userId = $userId;
				`
				,
				{
					$userId: a.userId,
				},
				(err: Error | null, row: object | null) => {
					if (err) {
						reject(err);
					}
					resolve(!!row);
				});
		});

		if (userAlreadyHasToken) {
			await new Promise<void>((resolve, reject): void => {
				database.run(
					`
					UPDATE userLogins
					SET userToken = $token
					WHERE userId = $userId;
					`,
					{
						$token: a.token,
						$userId: a.userId,
					},
					(err: Error | null): void => {
						if (err) {
							reject(err);
						}
						resolve();
					});
				});
		} else {
			await new Promise<void>((resolve, reject): void => {
				database.run(
					`
					INSERT
					INTO userLogins (userId, userToken)
					VALUES ($userId, $userToken);
					`,
					{
						$userId: a.userId,
						$userToken: a.token,
					},
					(err: Error | null): void => {
						if (err) {
							reject(err);
						}
						resolve();
					});
			});
		}
		return a.token;
	});
}

/**
 * Logs a user out based on his connection token
 * @param database the database to use
 * @param token the connection token of the user
 */
export async function logout(database: Sqlite3.Database, token: string): Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(
			`
			DELETE
			FROM userLogins
			WHERE userToken = $token;
			`,
			{
				$token: token,
			},
			(err: Error | null) => {
				if (err) {
					reject(err);
				}
				resolve();
			});
	});
}

/**
 * Registers a new user into the database and returns his connection token
 * @param database the database to use
 * @param params an object containing the infos of the new user
 */
export async function register(database: Sqlite3.Database, params: {userName: string, userPassword: string, userIconURL: URL, userLanguageId: number}): Promise<string> {
	return new Promise<void>((resolve, reject): void => {
		const joinedTimestamp: number = Date.now();
		database.run(
			`
			INSERT
			INTO users (userName, userPassword, userJoinedTimestamp, userIconURL, userLanguageId)
			VALUES ($userName, $userPassword, $userJoinedTimestamp, $userIconURL, $userLanguageId)
			`,
			{
				$userIconURL: params.userIconURL,
				$userJoinedTimestamp: joinedTimestamp,
				$userLanguageId: params.userLanguageId,
				$userName: params.userName,
				$userPassword: crypto.createHash("sha256").update(params.userPassword + joinedTimestamp.toString()).digest("hex"),
			},
			(err: Error | null): void => {
				if (err) {
					reject(err);
				}
				resolve();
			});
	})
	.then(() => {
		return login(database, params.userName, params.userPassword);
	});
}

export async function addFriend(database: Sqlite3.Database, userId: number, friendId: number):Promise<void> {
	return new Promise<void>((resolve, reject): void => {
		database.run(Statements.addFriend(),
			{
				$freindId: friendId,
				$userId: userId,
			},
			(err: Error | null): void => {
				if (err) {
					reject(err);
				}
				resolve();
			});
	});
}
