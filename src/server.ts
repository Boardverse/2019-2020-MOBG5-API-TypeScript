import * as bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import * as Sqlite3 from "sqlite3";

import {
	game,
	newGames,
	popularGames,
} from "./database/queries/games";
import {
	getLanguageId,
	getUserId,
	login,
	logout,
	register,
} from "./database/queries/users";
import { seed } from "./database/seed/seeder";
import { Game } from "./types/Game";
import { GameCategory } from "./types/GameCategory";
import { GameType } from "./types/GameType";
import { GlobalReview } from "./types/GlobalReview";

export const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const database: Sqlite3.Database = new Sqlite3.Database("database.sqlite3", async (): Promise<void> => {
	await seed(database);
});

const extractInfosMiddleware = async (request: Request, response: Response, next: NextFunction) => {
	const token: string | null = (request.headers.cookie || "")
									.split(";")
									.filter((cookie: string) => cookie.startsWith("token="))
									.map((cookie: string) => cookie.substr(6))[0] || null;
	response.locals.token = token;

	const userId: number | null = !!token ? await getUserId(database, token) : null;
	response.locals.userId = userId;

	const languageId: number = (!!userId) ? (await getLanguageId(database, userId) || 1) : 1;
	response.locals.languageId = languageId;

	return next();
};

const loginMiddleware = async (request: Request, response: Response, next: NextFunction) => {
	if (!response.locals.token || !response.locals.userId) {
		response.clearCookie("token");
		return response.json({error: "Unauthorized"});
	}

	return next();
};

app.use(extractInfosMiddleware);

app.post("/login/", async (request: Request, response: Response, next: NextFunction) => {
	login(database, request.body.login, request.body.password)
	.then((token: string): void => {
		response.cookie("token", token, {maxAge: 1000 * 60 * 60 * 24 * 30});
		response.json({});
	})
	.catch((err: Error): void => {
		response.clearCookie("token");
		response.json({error: err});
	});
});

app.post("/register/", async (request: Request, response: Response, next: NextFunction) => {
	register(database, {
		userIconURL: request.body.iconURL,
		userLanguageId: request.body.languageId,
		userName: request.body.userName,
		userPassword: request.body.password,
	})
	.then((token: string): void => {
		response.cookie("token", token, {maxAge: 1000 * 60 * 60 * 24 * 30});
		response.json({});
	})
	.catch((err: Error): void => {
		response.clearCookie("token");
		response.json({error: err});
	});
});

app.delete("/logout/", async (request: Request, response: Response, next: NextFunction) => {
	logout(database, response.locals.token)
	.then((): void => {
		response.clearCookie("token");
		response.json({});
	})
	.catch((err: Error): void => {
		response.clearCookie("token");
		response.json({error: err});
	});
});

app.get("/games/popular/", async (request: Request, response: Response, next: NextFunction) => {
	popularGames(database, response.locals.languageId, response.locals.userId)
	.then((games: Game[]): void => {
		response.json(games);
	})
	.catch((err: Error): void => {
		response.json({error: err});
	});
});

app.get("/games/new/", async (request: Request, response: Response, next: NextFunction) => {
	newGames(database, response.locals.languageId)
	.then((games: Game[]): void => {
		response.json(games);
	})
	.catch((err: Error): void => {
		response.json({error: err});
	});
});

app.get("/games/freindsPlaying/", loginMiddleware, async (request: Request, response: Response, next: NextFunction) => {
	freindsPlaying(database, response.locals.userId, response.locals.languageId)
	.then((games: Game[]): void => {
		response.json(games);
	})
	.catch((err: Error): void => {
		response.json({error: err});
	});
});

app.get("/games/knownEditor/", loginMiddleware, async (request: Request, response: Response, next: NextFunction) => {
	knownEditor(database, response.locals.userId, response.locals.languageId)
	.then((games: Game[]): void => {
		response.json(games);
	})
	.catch((err: Error): void => {
		response.json({error: err});
	});
});

app.get("/games/categories/", async (request: Request, response: Response, next: NextFunction) => {
	gameCategories(database)
	.then((categories: GameCategory[]): void => {
		response.json(categories);
	})
	.catch((err: Error): void => {
		response.json({error: err});
	});
});

app.get("/games/categories/:categoryId/", loginMiddleware, async (request: Request, response: Response, next: NextFunction) => {
	gameCategory(database, parseInt(request.params.categoryId, 10), response.locals.languageId)
	.then((games: Game[]): void => {
		response.json(games);
	})
	.catch((err: Error): void => {
		response.json({error: err});
	});
});

app.get("/games/types/", async (request: Request, response: Response, next: NextFunction) => {
	gameTypes(database)
	.then((types: GameType[]): void => {
		response.json(types);
	})
	.catch((err: Error): void => {
		response.json({error: err});
	});
});

app.get("/games/types/:typeId/", loginMiddleware, async (request: Request, response: Response, next: NextFunction) => {
	gameType(database, parseInt(request.params.typeId, 10), response.locals.languageId)
	.then((games: Game[]): void => {
		response.json(games);
	})
	.catch((err: Error): void => {
		response.json({error: err});
	});
});

app.get("/games/:gameId/", async (request: Request, response: Response, next: NextFunction) => {
	game(database, parseInt(request.params.gameId, 10), response.locals.languageId)
	.then((game: Game): void => {
		response.json(game);
	})
	.catch((err: Error): void => {
		response.json({error: err});
	});
});

app.get("/games/:gameId/reviews/", async (request: Request, response: Response, next: NextFunction) => {
	gameReviews(database, parseInt(request.params.gameId, 10))
	.then((reviews: GlobalReview): void => {
		response.json(reviews);
	})
	.catch((err: Error): void => {
		response.json({error: err});
	});
});

app.get("/games/:gameId/similar/", async (request: Request, response: Response, next: NextFunction) => {
	gameSimilar(database, parseInt(request.params.gameId, 10), parseInt(request.params.languageId, 10))
	.then((games: Game[]): void => {
		response.json(games);
	})
	.catch((err: Error): void => {
		response.json({error: err});
	});
});

app.get("/games/:gameId/sameEditor/", async (request: Request, response: Response, next: NextFunction) => {
	return response.json();
});

app.get("/games/:gameId/alsoPlaying/", async (request: Request, response: Response, next: NextFunction) => {
	return response.json();
});

app.get("/games/:gameId/friendsOwning/", loginMiddleware, async (request: Request, response: Response, next: NextFunction) => {
	return response.json();
});

app.get("/games/:gameId/sameType/", async (request: Request, response: Response, next: NextFunction) => {
	return response.json();
});

app.get("/users/:userId/", async (request: Request, response: Response, next: NextFunction) => {
	return response.json();
});

app.get("/users/:userId/friends/", async (request: Request, response: Response, next: NextFunction) => {
	return response.json();
});

app.get("/users/:userId/collection/", async (request: Request, response: Response, next: NextFunction) => {
	return response.json();
});

app.get("/users/:userId/reviews/", async (request: Request, response: Response, next: NextFunction) => {
	return response.json();
});

app.get("/users/:userId/played/", async (request: Request, response: Response, next: NextFunction) => {
	return response.json();
});

app.get("/users/:userId/wishlist/", async (request: Request, response: Response, next: NextFunction) => {
	return response.json();
});

app.get("/users/:userId/achievements/", async (request: Request, response: Response, next: NextFunction) => {
	return response.json();
});

app.get("/users/:userId/activities/", async (request: Request, response: Response, next: NextFunction) => {
	return response.json();
});

app.route("/freinds/:userId/")
	.all(loginMiddleware)
	.post(async (request: Request, response: Response, next: NextFunction) => {
		return response.json();
	})
	.delete(async (request: Request, response: Response, next: NextFunction) => {
		return response.json();
	});

app.route("/wishlist/:gameId/")
	.all(loginMiddleware)
	.post(async (request: Request, response: Response, next: NextFunction) => {
		return response.json();
	})
	.delete(async (request: Request, response: Response, next: NextFunction) => {
		return response.json();
	});

app.route("/collection/:gameId/")
	.all(loginMiddleware)
	.post(async (request: Request, response: Response, next: NextFunction) => {
		return response.json();
	})
	.delete(async (request: Request, response: Response, next: NextFunction) => {
		return response.json();
	});

app.get("*", (request: Request, response: Response, next: NextFunction) => {
	return response.json({error: "Not found"});
});
