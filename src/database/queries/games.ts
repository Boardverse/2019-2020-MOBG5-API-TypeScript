import * as Sqlite3 from "sqlite3";

import { Game } from "../../types/Game";
import { GameAward } from "../../types/GameAward";
import { GameCategory } from "../../types/GameCategory";
import { GamePicture } from "../../types/GamePicture";
import { GameType } from "../../types/GameType";
import { Language } from "../../types/Language";
import { Publisher } from "../../types/Publisher";

import * as Statements from "../statements/statements";

/**
 * Get all the infos about the specified game
 * @param database the database
 * @param gameId the game we want to get all the infos
 * @param languageId the id of the language to return all the infos into
 */
export async function getFullGame(database: Sqlite3.Database, gameId: number, languageId: number = 1): Promise<Game> {
	const game: Promise<any> = new Promise<any>((resolve, reject): void => {
		database.get(Statements.getLocalizedFullGames(Statements.getGameId()),
			{
				$gameId: gameId,
				$languageId: languageId,
			},
			(err: Error | null, row: any = {error: "Not Found"}): void => {
				if (err) {
					reject(err);
				}
				resolve(row);
			});
	});
	const types: Promise<GameType[]> = new Promise<GameType[]>((resolve, reject): void => {
		database.all(Statements.getLocalizedTypes(Statements.getGameTypes()),
			{
				$gameId: gameId,
				$languageId: languageId,
			},
			(err: Error | null, rows: GameType[] = []): void => {
				if (err) {
					reject(err);
				}
				resolve(rows);
			});
	});
	const categories: Promise<GameCategory[]> = new Promise<GameCategory[]>((resolve, reject): void => {
		database.all(Statements.getLocalizedCategories(Statements.getGameCategories()),
			{
				$gameId: gameId,
				$languageId: languageId,
			},
			(err: Error | null, rows: GameCategory[] = []): void => {
				if (err) {
					reject(err);
				}
				resolve(rows);
			});
	});
	const pictures: Promise<GamePicture[]> = new Promise<GamePicture[]>((resolve, reject): void => {
		database.all(Statements.getGamePictures(),
			{
				$gameId: gameId,
			},
			(err: Error | null, rows: GamePicture[] = []): void => {
				if (err) {
					reject(err);
				}
				resolve(rows);
			});
	});
	const publishers: Promise<Publisher[]> = new Promise<Publisher[]>((resolve, reject): void => {
		database.all(Statements.getPublishersNames(Statements.getGamePublishers()),
			{
				$gameId: gameId,
			},
			(err: Error, rows: Publisher[] = []) => {
				if (err) {
					reject(err);
				}
				resolve(rows);
			});
	});
	const awards: Promise<GameAward[]> = new Promise<GameAward[]>((resolve, reject): void => {
		database.all(Statements.getGameAwards(),
			{
				$gameId: gameId,
			},
			(err: Error | null, rows: GameAward[] = []) => {
				if (err) {
					reject(err);
				}
				resolve(rows);
			});
	});
	const languages: Promise<Language[]> = new Promise<Language[]>((resolve, reject): void => {
		database.all(Statements.getGameLocalizedLanguages(),
			{
				$gameId : gameId,
				$languageId : languageId,
			},
			(err: Error | null, rows: Language[] = []) => {
				if (err) {
					reject(err);
				}
				resolve(rows);
			});
	});

	Object.assign(await game, {types: await types});
	Object.assign(await game, {categories: await categories});
	Object.assign(await game, {picturesURL: await pictures});
	Object.assign(await game, {publishers: await publishers});
	Object.assign(await game, {awards: await awards});
	Object.assign(await game, {languages: await languages});
	return await game;
}

/**
 * Get a list of the popular games
 * @param database the database
 * @param languageId the id of the language to return all the infos into
 * @param userId the id of the logged in user (to remove the games he already owns)
 */
export async function getPopularGames(database: Sqlite3.Database, languageId: number, userId: number | null): Promise<Game[]> {
	return new Promise<Game[]>((resolve, reject): void => {
		database.all(
			Statements.getLocalizedMinGames(
				Statements.getMaxNumberGames(
					Statements.getGamesInNotIn(
						Statements.getPopularGames(),
						Statements.getUserGamesCollection(),
					),
				),
			),
			{
				$languageId: languageId,
				$limit: 20,
				$time: Date.now() - (1000 * 60 * 60 * 24 * 7),
				$userId: userId,
			},
			(err: Error | null, rows: Game[]): void => {
				if (err) {
					reject(err);
				}
				resolve(rows);
			});
	});
}

export async function getNewGames(database: Sqlite3.Database, languageId: number, userId: number | null): Promise<Game[]> {
	return new Promise<Game[]>((resolve, reject): void => {
		console.log(Statements.getLocalizedMinGames(
			Statements.getMaxNumberGames(
				Statements.getGamesInNotIn(
					Statements.getNewGames(),
					Statements.getUserGamesCollection(),
				),
			),
		));
		database.all(
			Statements.getLocalizedMinGames(
				Statements.getMaxNumberGames(
					Statements.getGamesInNotIn(
						Statements.getNewGames(),
						Statements.getUserGamesCollection(),
					),
				),
			),
			{
				$languageId: languageId,
				$limit: 20,
				$time: Date.now() - (1000 * 60 * 60 * 24 * 7),
				$userId: userId,
			},
			(err: Error | null, rows: Game[]): void => {
				if (err) {
					reject(err);
				}
				resolve(rows);
			});
	});
}

export async function getGamesFreindsPlaying(database: Sqlite3.Database, languageId: number, userId: number | null): Promise<Game[]> {
	return new Promise<Game[]>((resolve, reject): void => {
		database.all(Statements.getLocalizedMinGames(
						Statements.getGamesInNotIn(
							Statements.getUsersGamesCollection(
								Statements.getUserFriends(),
							),
							Statements.getUserGamesCollection(),
						),
					),
			{
				$languageId: languageId,
				$userId: userId,
			},
			(err: Error | null, rows: Game[]): void => {
				if (err) {
					reject(err);
				}
				resolve(rows);
			});
	});
}
