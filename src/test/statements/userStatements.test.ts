import { expect } from "chai";
import * as Sqlite3 from "sqlite3";
import { migrate } from "../../database/migrate/migrate";
import {
getLanguageId,
getUserId,
login,
logout,
register } from "../../database/queries/users";

let testDatabase: Sqlite3.Database;

beforeEach(async () => {
	testDatabase = new Sqlite3.Database(":memory:");
	await migrate(testDatabase);
});

afterEach(async () => {
	await testDatabase.close(() => {
		Promise.resolve();
	});
});

describe("register", () => {
	it("register a user in the database", () => {
		const reg = async () => {
			await register(testDatabase, {
				userIconURL: new URL("http://testDomain.com/testIconURL"),
				userLanguageId: 1,
				userName: "testUser",
				userPassword: "testPassword",
			});
		};
		expect(reg).not.to.throw();
	});
});
