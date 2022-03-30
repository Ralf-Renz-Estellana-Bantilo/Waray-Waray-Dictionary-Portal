import "./App.css";
import ApprovedEntries from "./ApprovedEntries";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EntryForm from "./EntryForm";
import SubmittedEntries from "./SubmittedEntries";
import ReviewEntries from "./ReviewEntries";
import { useEffect, useState } from "react";
import axios from "axios";
import AppConfiguration from "./AppConfiguration";

function App() {
	const [activePage, setActivePage] = useState("EntryForm");
	const [admin, setAdmin] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [submittedEntries, setSubmittedEntries] = useState([]);
	const [approvedEntries, setApprovedEntries] = useState([]);
	const [reviewEntries, setReviewEntries] = useState([]);

	const addEntry = async (entry) => {
		setSubmittedEntries((entries) => [...entries, entry]);
		setReviewEntries((entries) => [...entries, entry]);

		try {
			await axios
				.post(`${AppConfiguration.url()}/api/create-submitted-entry`, {
					word_ID: entry.word_ID,
					word: entry.word,
					definition: entry.definition,
					example_usage: entry.example_usage,
					figure_speech: entry.figure_speech,
					dialect: entry.dialect,
					origin: entry.origin,
					contributor: entry.contributor,
					email_address: entry.email_address,
					word_speak: entry.word_speak,
					date: entry.date,
					filename: entry.filename,
					phonetic_spelling: entry.phonetic_spelling,
				})
				.catch((error) => console.log(error));

			await axios
				.post(`${AppConfiguration.url()}/api/create-review-entry`, {
					word_ID: entry.word_ID,
					word: entry.word,
					definition: entry.definition,
					example_usage: entry.example_usage,
					figure_speech: entry.figure_speech,
					dialect: entry.dialect,
					origin: entry.origin,
					contributor: entry.contributor,
					word_speak: entry.word_speak,
					date: entry.date,
					filename: entry.filename,
					phonetic_spelling: entry.phonetic_spelling,
				})
				.catch((error) => console.log(error));
		} catch (error) {
			alert(error);
		}
	};

	const handleApproveEntry = async (entry) => {
		setApprovedEntries((entries) => [...entries, entry]);

		let reviewEntry = reviewEntries;
		let index = reviewEntry.findIndex((x) => x.word_ID === entry.word_ID);
		reviewEntry.splice(index, 1);
		setReviewEntries(reviewEntry);

		try {
			await axios
				.post(`${AppConfiguration.url()}/api/create-approved-entry`, {
					word_ID: entry.word_ID,
					word: entry.word,
					definition: entry.definition,
					example_usage: entry.example_usage,
					figure_speech: entry.figure_speech,
					dialect: entry.dialect,
					origin: entry.origin,
					contributor: entry.contributor,
					email_address: entry.email_address,
					word_speak: entry.word_speak,
					date: entry.date,
					filename: entry.filename,
					phonetic_spelling: entry.phonetic_spelling,
				})
				.catch((error) => console.log(error));

			await axios.delete(
				`${AppConfiguration.url()}/api/delete-review-entry/${entry.word_ID}`
			);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(async () => {
		try {
			// await axios.get("http://localhost:1999/api/words").then((response) => {
			// 	console.log(response.data);
			// });
			await axios
				.get(`${AppConfiguration.url()}/api/read-submitted-entries`)
				.then((response) => {
					// console.log(response.data);
					setSubmittedEntries(response.data);
				});
			await axios
				.get(`${AppConfiguration.url()}/api/read-review-entries`)
				.then((response) => {
					// console.log(response.data);
					setReviewEntries(response.data);
				});
			await axios
				.get(`${AppConfiguration.url()}/api/read-approved-entries`)
				.then((response) => {
					// console.log(response.data);
					setApprovedEntries(response.data);
				});
			await axios
				.get(`${AppConfiguration.url()}/api/read-admin-accounts`)
				.then((response) => {
					// console.log(response.data);
					setAdmin(response.data);
				});
		} catch (error) {
			console.log(error);
		}

		const isLogin = sessionStorage.getItem("showLoginDialog");
		if (isLogin === null) {
			sessionStorage.setItem("showLoginDialog", false);
			setIsLoggedIn(false);
		} else if (isLogin === "true") {
			setIsLoggedIn(true);
		} else if (isLogin === "false") {
			setIsLoggedIn(false);
		} else {
			setIsLoggedIn(false);
		}
	}, []);

	return (
		<div className='app'>
			<BrowserRouter>
				<Routes>
					<Route
						exact
						path='/'
						element={
							<EntryForm
								activePage={activePage}
								admin={admin}
								isLoggedIn={isLoggedIn}
								setIsLoggedIn={setIsLoggedIn}
								setActivePage={setActivePage}
								addEntry={addEntry}
							/>
						}
					/>
					<Route
						exact
						path='/submitted-entries'
						element={
							<SubmittedEntries
								activePage={activePage}
								submittedEntries={submittedEntries}
								admin={admin}
								isLoggedIn={isLoggedIn}
								setIsLoggedIn={setIsLoggedIn}
								setActivePage={setActivePage}
							/>
						}
					/>
					<Route
						exact
						path='/approved-entries'
						element={
							<ApprovedEntries
								activePage={activePage}
								approvedEntries={approvedEntries}
								admin={admin}
								isLoggedIn={isLoggedIn}
								setIsLoggedIn={setIsLoggedIn}
								setActivePage={setActivePage}
								setApprovedEntries={setApprovedEntries}
							/>
						}
					/>
					<Route
						exact
						path='/review-entries'
						element={
							<ReviewEntries
								activePage={activePage}
								reviewEntries={reviewEntries}
								admin={admin}
								isLoggedIn={isLoggedIn}
								setIsLoggedIn={setIsLoggedIn}
								setActivePage={setActivePage}
								handleApproveEntry={handleApproveEntry}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
