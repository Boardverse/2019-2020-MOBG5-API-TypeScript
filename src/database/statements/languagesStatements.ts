/**
 * $gameId
 * $languageId
 */
export function getGameLocalizedLanguages(): string {
	return `
	SELECT	gameLanguages.languageId AS languageId,
			languageNameInLanguageId
	FROM (
		SELECT languageId
		FROM gameLanguages
		WHERE gameId = $gameId
	) gameLanguages
	JOIN (
		SELECT	languageId,
				languageNameInLanguageId
		FROM languages
		WHERE languageIdInLanguageId = $languageId
	) languages
	ON languages.languageId = gameLanguages.languageId
	`;
}
