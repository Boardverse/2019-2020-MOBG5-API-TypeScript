/**
 * $userId
 */
export function getUserGamesCollection(): string {
	return `
	SELECT gameId
	FROM userCollections
	WHERE userId = $userId
	`;
}

/**
 * Returns a list with all the id's of the games this user owns
 * @param usersId 
 */
export function getUsersGamesCollection(usersId: string): string {
	return `
	SELECT gameId
	FROM userCollection
	WHERE userId IN (${usersId})
	`;
}
