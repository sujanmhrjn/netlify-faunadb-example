const faunadb = require("faunadb");
const chalk = require("chalk"); // adding colors in console
const q = faunadb.query;

console.log("===== Creating your faunadb database =====");
// 1. Check for required enviroment variables
if (!process.env.FAUNADB_SERVER_SECRET) {
	console.log(
		chalk.yellow(
			"Required FAUNADB_SERVER_SECRET environment variable not found"
		)
	);
	console.log(
		`Make sure you have created your Fauna database with "netlify addons:create fauna"`
	);
	process.exit(1);
}

// Has var. Do the thing
if (process.env.FAUNADB_SERVER_SECRET) {
	createFaunaDB(process.env.FAUNADB_SERVER_SECRET).then(() => {
		console.log("Fauna Database schema has been created");
		console.log('Claim your fauna database with "netlify addons:auth fauna"');
	});
}

//creating faunadb
function createFaunaDB(key) {
	console.log(chalk.green("Create the database schema"));
	const client = new faunadb.Client({
		secret: key,
	});

	var createP = client
		.query(
			q.Create(q.Ref("classes"), { name: "formDetails" }) // collection name
		)
		.then(() => {})
		.catch((e) => {
			if (
				e.requestResult.statusCode === 400 &&
				e.message === "instance not unique"
			) {
				console.log("Fauna already setup! Good to go");
				console.log(
					'Claim your fauna database with "netlify addons:auth fauna"'
				);
				throw e;
			}
		});
	return createP;
}
