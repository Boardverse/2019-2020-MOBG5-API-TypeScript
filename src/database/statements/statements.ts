export * from "./friendStatements";
export * from "./gameStatements";
export * from "./languagesStatements";
export * from "./userStatements";

export function getLocalizedFullGames(idGamesQuery: string): string {
	return `
	SELECT	games.gameId AS gameId,
			gameName AS gameName,
			gameDescription AS gameDescription,
			gamePublishingDate AS gamePublishingDate,
			gameThumbnailURL AS gameThumbnailURL,
			gameMinPlayers AS gameMinPlayers,
			gameRecommendedPlayers AS gameRecommendedPlayers,
			gameMaxPlayers AS gameMaxPlayers,
			gameMinDuration AS gameMinDuration,
			gameAverageDuration AS gameAverageDuration,
			gameMaxDuration AS gameMaxDuration,
			gameMinAge AS gameMinAge,
			gameRecommendedAge AS gameRecommendedAge,
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
		SELECT	gameId,
				avg(userReviewScore) AS userReviewScores
		FROM userReviews
		GROUP BY gameId
		HAVING gameId = $gameId
	) gameScores
	ON gameScores.gameId = games.gameId
	`;
}

/**
 * Returns a list with minimum infos about provided games
 * @param idGamesQuery a list of id's with games
 * $languageId
 */
export function getLocalizedMinGames(idGamesQuery: string): string {
	return `
	SELECT	g1.gameId,
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
		SELECT	gameId,
				gameName
		FROM gameNames
		WHERE gameId IN ( ${idGamesQuery} )
		AND languageId = $languageId
	) g3
	ON g1.gameId = g3.gameId
	JOIN (
		SELECT	gameId,
				avg(userReviewScore) AS score
		FROM userReviews
		WHERE gameId IN ( ${idGamesQuery} )
		GROUP BY gameId
	) g4
	ON g1.gameId = g4.gameId
	`;
}

export function getGameId(): string {
	return `
	SELECT gameId
	FROM games
	WHERE gameId = $gameId
	`;
}

/**
 * Removes the id of the games in "remove" from the list from "from"
 * @param from the source of the id's
 * @param remove the source of the id's to remove
 */
export function getGamesInNotIn(from: string, remove: string): string {
	return `
	SELECT gameId
	FROM (${from})
	WHERE gameId
	NOT IN (${remove})
	`;
}
