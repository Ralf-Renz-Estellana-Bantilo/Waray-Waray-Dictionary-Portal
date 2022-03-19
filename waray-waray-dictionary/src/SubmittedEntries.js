import React, { useEffect } from "react";
import Header from "./Header";
import Navbar from "./Navbar";

const SubmittedEntries = ({
	activePage,
	setActivePage,
	submittedEntries,
	admin,
	isLoggedIn,
	setIsLoggedIn,
}) => {
	let listOfSubmittedEntries = submittedEntries.map((entries, index) => {
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

	useEffect(() => {
		setActivePage("SubmittedEntries");
	}, []);

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
			<div className='submitted-entries-container'>
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
					{listOfSubmittedEntries}
				</table>
				{submittedEntries.length < 1 && (
					<p
						style={{
							width: "100%",
							backgroundColor: "red",
							textAlign: "center",
							padding: "10px",
							color: "white",
						}}>
						No submitted entries to display!
					</p>
				)}
			</div>
		</>
	);
};

export default SubmittedEntries;
