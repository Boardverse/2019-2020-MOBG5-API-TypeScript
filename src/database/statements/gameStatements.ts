/**
 * Returns the id's of the types of the game
 * $gameId
 */
export function getGameTypes(): string {
	return `
	SELECT gameTypeId
	FROM gameTypes
	WHERE gameId = $gameId
	`;
}

/**
 * Returns the localized names of the types of the game
 * @param typesId the id's of the types of a game
 * $languageId
 */
export function getLocalizedTypes(typesId: string): string {
	return `
	SELECT	gameTypesId.gameTypeId AS id,
			gameTypesNames.gameTypeName AS name
	FROM ( ${typesId} ) gameTypesId
	JOIN (
		SELECT gameTypeId, gameTypeName
		FROM gameTypesNames
		WHERE languageId = $languageId
		AND gameTypeId IN ( ${typesId} )
	) gameTypesNames
	ON gameTypesNames.gameTypeId = gameTypesId.gameTypeId
	`;
}

/**
 * Returns the id's of the categories of the game
 * $gameId
 */
export function getGameCategories(): string {
	return `
	SELECT gameCategoryId
	FROM gameCategories
	WHERE gameId = $gameId
	`;
}

/**
 * Returns the localized names of the categories of the game
 * @param categoriesId the id's of the types of a game
 * $languageId
 */
export function getLocalizedCategories(categoriesId: string): string {
	return `
	SELECT	gameCategoriesId.gameCategoryId AS id,
			gameCategoriesNames.gameCategoryName AS name
	FROM ( ${categoriesId} ) gameCategoriesId
	JOIN (
		SELECT gameCategoryId, gameCategoryName
		FROM gameCategoriesNames
		WHERE languageId = $languageId
		AND gameCategoryId IN ( ${categoriesId} )
	) gameCategoriesNames
	ON gameCategoriesNames.gameCategoryId = gameCategoriesId.gameCategoryId
	`;
}

/**
 * Returns the pictures of a game
 * $gameId
 */
export function getGamePictures(): string {
	return `
	SELECT	gamePictureId AS id,
		gamePictureURL AS url
	FROM gamePictures
	WHERE gameId = $gameId
	`;
}

/**
 * Returns the id's of the publishers of a game
 * $gameId
 */
export function getGamePublishers(): string {
	return `
	SELECT gamePublisherId
		FROM gamePublishers
		WHERE gameId = $gameId
	`;
}

/**
 * Returns the name of the publishers's id's
 * @param publishersId the id's of the publishers
 */
export function getPublishersNames(publishersId: string): string {
	return `
	SELECT	gamePublishers.gamePublisherId AS id,
	gamePublisherName AS name
	FROM ( ${publishersId} ) gamePublishers
	JOIN gamePublishersNames
	ON gamePublishersNames.gamePublisherId = gamePublishers.gamePublisherId
	`;
}

/**
 * $gameId
 */
export function getGameAwards(): string {
	return `
	SELECT	gameAwardId,
			gameAwardYear
	FROM gameAwards
	WHERE gameId = $gameId
	`;
}

export function getAwardsNames(awardsId: string): string {
	return `
	SELECT	gameAwards.gameAwardId,
			gameAwardName,
			gameAwardYear
	FROM ( ${awardsId} ) gameAwards
	JOIN gameAwardsNames
	ON gameAwards.gameAwardId = gameAwardsNames.gameAwardId
	`;
}

/**
 * $time
 */
export function getPopularGames(): string {
	return `
	SELECT gameId
	FROM (
		SELECT	gameId,
				count(*) as amount
		FROM userCollections
		WHERE userCollectionAddedTimestamp >= $time
		GROUP BY gameId
		ORDER BY amount DESC
	)
	ORDER BY RANDOM()
	`;
}

/**
 * $time
 */
export function getNewGames(): string {
	return `
	SELECT gameId
	FROM games
	WHERE gamePublishingDate >= $time
	ORDER BY RANDOM()
	`;
}
/**
 * Returns a list with a mamimum of values
 * @param limit the number of games to retrieve
 */
export function getMaxNumberGames(from: string): string {
	return `
	SELECT gameId
	FROM ( ${from} )
	LIMIT $limit
	`;
}
