import { app } from "./server";

const port: number = 3000;

app.listen(port, () => {
	process.stdout.write(`Listening on ${port}\n`);
});
