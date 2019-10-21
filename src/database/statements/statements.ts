export const getMinLocalizedGame: string = `
SELECT 	games.gameId AS id,
		gameName AS name,
		gameDescription AS description,
		gamePublishingDate AS publishingDate,
		gameThumbnailURL AS thumbnailURL,
		gameMinPlayers AS minPlayers,
		gameRecommendedPlayers AS recommendedPlayers,
		gameMaxPlayers AS maxPlayers,
		gameMinDuration AS minDuration,
		gameAverageDuration AS averageDuration,
		gameMaxDuration AS maxDuration,
		gameMinAge AS minAge,
		gameRecommendedAge AS recommendedAge,
		gameMaxAge AS maxAge,
		userReviewScores AS score
FROM (
	SELECT *
	FROM games
	WHERE gameId = $gameId
) games
JOIN (
	SELECT gameId, gameName
	FROM gameNames
	WHERE gameId = $gameId
	AND languageId = $languageId
) gameNames
ON gameNames.gameId = games.gameId
JOIN (
	SELECT gameId, gameDescription
	FROM gameDescriptions
	WHERE gameId = $gameId
	AND languageId = $languageId
) gameDescriptions
ON gameDescriptions.gameId = games.gameId
JOIN (
	SELECT 	gameId,
			avg(userReviewScore) AS userReviewScores
	FROM userReviews
	GROUP BY gameId
	HAVING gameId = $gameId
) gameScores
ON gameScores.gameId = games.gameId;`;

export const getLocalizedTypes: string = `
SELECT 	gameTypes.gameTypeId AS id,
		gameTypesNames.gameTypeName AS name
FROM (
	SELECT gameTypeId
	FROM gameTypes
	WHERE gameId = $gameId
) gameTypes
JOIN (
	SELECT gameTypeId, gameTypeName
	FROM gameTypesNames
	WHERE languageId = $languageId
) gameTypesNames ON gameTypesNames.gameTypeId = gameTypes.gameTypeId;`;

export const getLocalizedCategories: string = `
SELECT 	gameCategories.gameCategoryId AS id,
		gameCategoriesNames.gameCategoryName AS name
FROM (
	SELECT gameCategoryId
	FROM gameCategories
	WHERE gameId = $gameId
) gameCategories
JOIN (
	SELECT gameCategoryId, gameCategoryName
	FROM gameCategoriesNames
	WHERE languageId = $languageId
) gameCategoriesNames ON gameCategoriesNames.gameCategoryId = gameCategories.gameCategoryId;`;

export const getPictures: string = `
SELECT 	gamePictureId AS id,
	gamePictureURL AS url
FROM gamePictures
WHERE gameId = $gameId`;

export const getPublishers: string = `
SELECT 	gamePublishers.gamePublisherId AS id,
		gamePublisherName AS name
FROM (
	SELECT gamePublisherId
	FROM gamePublishers
	WHERE gameId = $gameId
) gamePublishers
JOIN gamePublishersNames
ON gamePublishersNames.gamePublisherId = gamePublishers.gamePublisherId`;

export const getAwards: string = `
SELECT 	gameAwards.gameAwardId,
		gameAwardName,
		gameAwardYear
FROM (
	SELECT 	gameAwardId,
			gameAwardYear
	FROM gameAwards
	WHERE gameId = $gameId
) gameAwards
JOIN gameAwardsNames
ON gameAwards.gameAwardId = gameAwardsNames.gameAwardId;
`;

export const getLocalizedLanguages: string = `
SELECT 	gameLanguages.languageId AS id,
		languageName AS name
FROM (
	SELECT languageId
	FROM gameLanguages
	WHERE gameId = $gameId
) gameLanguages
JOIN (
	SELECT 	languageId,
			languageName
	FROM languages
	WHERE languageIdInLanguageId = $languageId
) languages
ON languages.languageId = gameLanguages.languageId;
`;

export function getPopularGames(limited: boolean): string {
	return `
	SELECT gameId
	FROM (
		SELECT 	gameId,
				count(*) as amount
		FROM userCollections
		WHERE userCollectionAddedTimestamp >= $time
		${limited ? `WHERE gameId NOT IN ( ${getUserGames()} ) ` : ``}
		GROUP BY gameId
		ORDER BY amount DESC
		LIMIT 20
	)
	ORDER BY RANDOM()
	`;
}

export function getUserGames(): string {
	return `
	SELECT gameId
	FROM userCollection
	WHERE userId = $userId
	`;
}

export function getNewGames(): string {
	return `
	SELECT gameId
	FROM games
	WHERE gamePublishingDate > $time
	ORDER BY RANDOM()
	LIMIT 20;
	`;
}

export function getLocalizedMinGames(idGamesQuery: string): string {
	return `
	SELECT 	g1.gameId,
			g2.gameThumbnailURL,
			g3.gameName,
			g4.score
	FROM ( ${idGamesQuery} ) g1
	JOIN (
		SELECT	gameId,
				gameThumbnailURL
		FROM games
		WHERE gameId IN ( ${idGamesQuery} )
	) g2
	ON g2.gameId = g1.gameId
	JOIN (
		SELECT 	gameId,
				gameName
		FROM gameNames
		WHERE gameId IN ( ${idGamesQuery} )
		AND languageId = $languageId
	) g3
	ON g1.gameId = g3.gameId
	JOIN (
		SELECT 	gameId,
				avg(userReviewScore) AS score
		FROM userReviews
		WHERE gameId IN ( ${idGamesQuery} )
		GROUP BY gameId
	) g4
	ON g1.gameId = g4.gameId
	`;
}

export function addFriend(): string {
	return ``;
}
