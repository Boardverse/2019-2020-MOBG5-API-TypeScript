// TODO
export function addFriend(): string {
	return ``;
}

/**
 * Returns the id's of the user's friend
 * $userId
 */
export function getUserFriends(): string {
	return `
	SELECT userFriendUserId
	FROM userFriends
	WHERE userId = $userId
	`;
}
