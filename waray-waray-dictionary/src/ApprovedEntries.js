import axios from "axios";
import React, { useEffect, useState } from "react";
import ApprovalModal from "./ApprovalModal";
import Header from "./Header";
import Navbar from "./Navbar";

const ApprovedEntries = ({
	activePage,
	setActivePage,
	approvedEntries,
	admin,
	isLoggedIn,
	setIsLoggedIn,
	setApprovedEntries,
}) => {
	const [openPreview, setOpenPreview] = useState(false);

	useEffect(() => {
		setActivePage("ApprovedEntries");
	}, []);

	const handlePushToDictionary = async () => {
		// try {
		// 	for (let a = 0; a < approvedEntries.length; a++) {
		// 		await axios
		// 			.post("http://localhost:1999/api/insert-to-word-entity", {
		// 				// word_ID: approvedEntries[a].word_ID,
		// 				word_search: approvedEntries[a].word,
		// 				word: approvedEntries[a].word,
		// 				PoS: approvedEntries[a].figure_speech,
		// 				other_words: null,
		// 				translation: null,
		// 				definition: approvedEntries[a].definition,
		// 				example: approvedEntries[a].example,
		// 				dialect: approvedEntries[a].dialect,
		// 				origin: approvedEntries[a].origin,
		// 				word_speak: null,
		// 				contributor: approvedEntries[a].contributor,
		// 			})
		// 			.catch((error) => console.log(error));
		// 	}
		// } catch (error) {
		// 	console.log(error);
		// }
	};

	let listOfApprovedEntries = approvedEntries.map((entries, index) => {
		// const audio = require(`../public/audio/${entries.filename}`);

		return (
			<tr key={index}>
				<td>{entries.word}</td>
				<td>{entries.phonetic_spelling}</td>
				<td>{entries.definition}</td>
				<td>{entries.example_usage}</td>
				<td>
					{entries.figure_speech ? entries.figure_speech : "not specified"}
				</td>
				<td>{entries.dialect ? entries.dialect : "not specified"}</td>
				<td>{entries.origin ? entries.origin : "not specified"}</td>
				<td>{entries.contributor}</td>
				{/* <td className='audio-file' style={{ width: "300px" }}>
					<audio controls src={audio}>
						Your browser does not support the
						<code>audio</code> element.
					</audio>
				</td> */}
			</tr>
		);
	});

	return (
		<>
			<Header
				admin={admin}
				isLoggedIn={isLoggedIn}
				setIsLoggedIn={setIsLoggedIn}
			/>
			<Navbar
				activePage={activePage}
				admin={admin}
				isLoggedIn={isLoggedIn}
				setIsLoggedIn={setIsLoggedIn}
			/>
			<>
				<div className='approved-entries-container'>
					<table>
						<tr>
							<th>Word</th>
							<th>Phonetic Spelling</th>
							<th>Definition</th>
							<th>Example</th>
							<th>Figure of Speech</th>
							<th>Dialect</th>
							<th>Place of Origin</th>
							<th>Contributor</th>
							{/* <th>How to Pronounce</th> */}
						</tr>
						{listOfApprovedEntries}
					</table>
					{approvedEntries.length < 1 && (
						<p
							style={{
								width: "100%",
								backgroundColor: "red",
								textAlign: "center",
								padding: "10px",
								color: "white",
							}}>
							No approved entries to display!
						</p>
					)}
				</div>
				{isLoggedIn && approvedEntries.length > 5 && (
					<div className='approval-container'>
						<button onClick={handlePushToDictionary}>
							SAVE TO DICTIONARY
						</button>
					</div>
				)}

				{openPreview && (
					<ApprovalModal
						approvedEntries={approvedEntries}
						setOpenPreview={setOpenPreview}
						setApprovedEntries={setApprovedEntries}
					/>
				)}
			</>
		</>
	);
};

export default ApprovedEntries;
