const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3");

const app = express();
const PORT = process.env.PORT || 1999;

app.use(cors());
app.use(express.json());
// app.use("/Database", express.static("./Database"));

let db = new sqlite3.Database("./Database/dictionary.db", (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log("Connected to the in-memory SQlite database.");
});

app.get("/api/get-database/:filename", (req, res) => {
	res.download(`./Database/${req.params.filename}`);
});

app.get("/api/words", (req, res) => {
	var sql = "SELECT * FROM word_entity";
	// var params = [];
	db.all(sql, (err, response) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.send(response);
	});
});

// SUBMITTED ENTRIES -----------------------------------
app.get("/api/read-submitted-entries", (req, res) => {
	var sql =
		"SELECT * FROM submitted_entries ORDER BY submitted_entries.date ASC";
	// var params = [];
	db.all(sql, (err, response) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.send(response);
		// console.log(response);
	});
});

app.post("/api/create-submitted-entry", (req, res) => {
	const word_ID = req.body.word_ID;
	const word = req.body.word;
	const definition = req.body.definition;
	const example_usage = req.body.example_usage;
	const figure_speech = req.body.figure_speech;
	const dialect = req.body.dialect;
	const origin = req.body.origin;
	const contributor = req.body.contributor;
	const email_address = req.body.email_address;
	const word_speak = req.body.word_speak;
	const date = req.body.date;
	const filename = req.body.filename;
	const phonetic_spelling = req.body.phonetic_spelling;

	var sql =
		"INSERT INTO submitted_entries (word_ID, word, definition, example_usage, figure_speech, dialect, origin, contributor, email_address, word_speak, date, filename, phonetic_spelling) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	var params = [
		word_ID,
		word,
		definition,
		example_usage,
		figure_speech,
		dialect,
		origin,
		contributor,
		email_address,
		word_speak,
		date,
		filename,
		phonetic_spelling,
	];
	db.all(sql, params, (err, response) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.send("New entry has been added!");
		// console.log(response);
	});
});

// REVIEW ENTRIES -----------------------------------
app.get("/api/read-review-entries", (req, res) => {
	var sql = "SELECT * FROM review_entries ORDER BY review_entries.date ASC";
	// var params = [];
	db.all(sql, (err, response) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.send(response);
		// console.log(response);
	});
});

app.post("/api/create-review-entry", (req, res) => {
	const word_ID = req.body.word_ID;
	const word = req.body.word;
	const definition = req.body.definition;
	const example_usage = req.body.example_usage;
	const figure_speech = req.body.figure_speech;
	const dialect = req.body.dialect;
	const origin = req.body.origin;
	const contributor = req.body.contributor;
	const word_speak = req.body.word_speak;
	const date = req.body.date;
	const filename = req.body.filename;
	const phonetic_spelling = req.body.phonetic_spelling;

	var sql =
		"INSERT INTO review_entries (word_ID, word, definition, example_usage, figure_speech, dialect, origin, contributor, word_speak, date, filename, phonetic_spelling) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	var params = [
		word_ID,
		word,
		definition,
		example_usage,
		figure_speech,
		dialect,
		origin,
		contributor,
		word_speak,
		date,
		filename,
		phonetic_spelling,
	];
	db.all(sql, params, (err, response) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.send("New entry has been added!");
		// console.log(response);
	});
});

app.delete("/api/delete-review-entry/:id", (req, res) => {
	const word_ID = req.params.id;

	var sql = "DELETE FROM review_entries WHERE word_ID = ?";
	var params = [word_ID];

	db.all(sql, params, (err, response) => {
		if (err) {
			res.status(400).json({ error: err.message });
			console.log(err);
		}
		res.send("Review entry has been deleted");
	});
});

// APPROVED ENTRIES -----------------------------------
app.get("/api/read-approved-entries", (req, res) => {
	var sql =
		"SELECT * FROM approved_entries ORDER BY approved_entries.date ASC";
	// var params = [];
	db.all(sql, (err, response) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.send(response);
		// console.log(response);
	});
});

app.post("/api/create-approved-entry", (req, res) => {
	const word_ID = req.body.word_ID;
	const word = req.body.word;
	const definition = req.body.definition;
	const example_usage = req.body.example_usage;
	const figure_speech = req.body.figure_speech;
	const dialect = req.body.dialect;
	const origin = req.body.origin;
	const contributor = req.body.contributor;
	const word_speak = req.body.word_speak;
	const date = req.body.date;
	const filename = req.body.filename;
	const phonetic_spelling = req.body.phonetic_spelling;
	const status = "active";

	var sql =
		"INSERT INTO approved_entries (word_ID, word, definition, example_usage, figure_speech, dialect, origin, contributor, word_speak, date, filename, phonetic_spelling, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	var params = [
		word_ID,
		word,
		definition,
		example_usage,
		figure_speech,
		dialect,
		origin,
		contributor,
		word_speak,
		date,
		filename,
		phonetic_spelling,
		status,
	];
	db.all(sql, params, (err, response) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.send("New entry has been added!");
		// console.log(response);
	});
});

app.put("/api/update-approved-status", (req, res) => {
	const word_ID = req.body.word_ID;

	var sql = "UPDATE approved_entries SET status='closed' WHERE word_ID=?";
	var params = [word_ID];
	db.all(sql, params, (err, response) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.send("Entry has been pushed to the dictionary!");
		// console.log(response);
	});
});

// WORD ENTITY -----------------------------------
app.post("/api/insert-to-word-entity", (req, res) => {
	const word_ID = req.body.word_ID;
	const word_search = req.body.word_search;
	const word = req.body.word;
	const PoS = req.body.PoS;
	const other_words = req.body.other_words;
	const translation = req.body.translation;
	const definition = req.body.definition;
	const example = req.body.example;
	const dialect = req.body.dialect;
	const origin = req.body.origin;
	const word_speak = req.body.word_speak;
	const contributor = req.body.contributor;

	var sql =
		"INSERT INTO word_entity (word_search, word, PoS, other_words, translation, definition, example, dialect, origin ,word_speak, contributor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	var params = [
		word_search,
		word,
		PoS,
		other_words,
		translation,
		definition,
		example,
		dialect,
		origin,
		word_speak,
		contributor,
	];
	db.all(sql, params, (err, response) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.send("Entries have been pushed to the word_entity database table!");
		// console.log(response);
	});
});

// APPROVED ENTRIES -----------------------------------
app.get("/api/read-admin-accounts", (req, res) => {
	var sql = "SELECT * FROM account";
	// var params = [];
	db.all(sql, (err, response) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.send(response);
		// console.log(response);
	});
});

// // close the database connection
// db.close((err) => {
// 	if (err) {
// 		return console.error(err.message);
// 	}
// 	console.log("Close the database connection.");
// });
// db.run("SELECT * FROM word_entity ", (err, result) => {
// 	if (err) {
// 		console.log("ERROR!", err);
// 	} else {
// 		console.log(result);
// 	}
// });

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
