import * as Sqlite3 from "sqlite3";

import { Game } from "../../types/Game";
import { GameAward } from "../../types/GameAward";
import { GameCategory } from "../../types/GameCategory";
import { GamePicture } from "../../types/GamePicture";
import { GameType } from "../../types/GameType";
import { Language } from "../../types/Language";
import { Publisher } from "../../types/Publisher";

import * as Statements from "../statements/statements";

export async function game(database: Sqlite3.Database, gameId: number, languageId: number = 1): Promise<Game> {
	const game: Promise<any> = new Promise<any>((resolve, reject): void => {
		database.get(Statements.getMinLocalizedGame,
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
		database.all(Statements.getLocalizedTypes,
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
		database.all(Statements.getLocalizedCategories,
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
		database.all(Statements.getPictures,
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
		database.all(Statements.getPublishers,
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
		database.all(Statements.getAwards,
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
		database.all(Statements.getLocalizedLanguages,
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

export async function popularGames(database: Sqlite3.Database, languageId: number, userId: number | null): Promise<Game[]> {
	return new Promise<Game[]>((resolve, reject): void => {
		database.all(Statements.getLocalizedMinGames(Statements.getPopularGames(!!userId)),
			{
				$languageId: languageId,
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

export async function newGames(database: Sqlite3.Database, languageId: number): Promise<Game[]> {
	return new Promise<Game[]>((resolve, reject): void => {
		database.all(Statements.getLocalizedMinGames(Statements.getNewGames()),
			{
				$languageId: languageId,
				$time: Date.now() - (1000 * 60 * 60 * 24 * 7),
			},
			(err: Error | null, rows: Game[]): void => {
				if (err) {
					reject(err);
				}
				resolve(rows);
			});
	});
}
