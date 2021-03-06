import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppConfiguration from "./AppConfiguration";
import Header from "./Header";
import ModalReviewEntry from "./ModalReviewEntry";
import Navbar from "./Navbar";

const ApprovedEntries = ({
	activePage,
	setActivePage,
	approvedEntries,
	admin,
	isLoggedIn,
	setIsLoggedIn,
	setApprovedEntries,
	submittedEntries,
	setSubmittedEntries,
}) => {
	const [previewEntry, setPreviewEntry] = useState(null);

	useEffect(() => {
		setActivePage("ApprovedEntries");
	}, []);

	const handlePushToDictionary = async () => {
		setApprovedEntries(
			approvedEntries.map((entry) =>
				entry.word_ID === previewEntry.word_ID
					? { ...entry, status: "closed" }
					: entry
			)
		);

		let submittedEntriesCopy = submittedEntries;
		let index = submittedEntriesCopy.findIndex(
			(x) => x.word_ID === previewEntry.word_ID
		);
		submittedEntriesCopy.splice(index, 1);
		setSubmittedEntries(submittedEntriesCopy);

		try {
			await axios
				.put(`${AppConfiguration.url()}/api/update-approved-status`, {
					word_ID: previewEntry.word_ID,
				})
				.then(() => {
					console.log(`Entry has been pushed to the dictionary`);
				})
				.catch((error) => console.log(error));

			await axios
				.post(`${AppConfiguration.url()}/api/insert-to-word-entity`, {
					word_search: previewEntry.word,
					word: previewEntry.word,
					PoS: previewEntry.figure_speech,
					other_words: null,
					translation: null,
					definition: previewEntry.definition,
					example: previewEntry.example,
					dialect: previewEntry.dialect,
					origin: previewEntry.origin,
					word_speak: null,
					contributor: previewEntry.contributor,
				})
				.then(() => {
					console.log("Entry has been added");
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
		}
	};

	let listOfApprovedEntries = approvedEntries.map((entries, index) => {
		return (
			<tr
				className={isLoggedIn ? "review-row" : ""}
				key={index}
				style={isLoggedIn ? { cursor: "pointer" } : {}}
				onClick={() => {
					if (entries.status === "closed") {
						setPreviewEntry(null);
					} else if (isLoggedIn) {
						setPreviewEntry(entries);
					}
				}}>
				<td
					style={
						entries.status === "closed" && isLoggedIn
							? { sampleStyle }
							: {}
					}>
					{entries.word}
				</td>
				<td
					style={
						entries.status === "closed" && isLoggedIn
							? { sampleStyle }
							: {}
					}>
					{entries.phonetic_spelling}
				</td>
				<td
					style={
						entries.status === "closed" && isLoggedIn
							? { sampleStyle }
							: {}
					}>
					{entries.definition}
				</td>
				<td
					style={
						entries.status === "closed" && isLoggedIn
							? { sampleStyle }
							: {}
					}>
					{entries.example_usage}
				</td>
				<td
					style={
						entries.status === "closed" && isLoggedIn
							? { sampleStyle }
							: {}
					}>
					{entries.figure_speech ? entries.figure_speech : "not specified"}
				</td>
				<td
					style={
						entries.status === "closed" && isLoggedIn
							? { sampleStyle }
							: {}
					}>
					{entries.dialect ? entries.dialect : "not specified"}
				</td>
				<td
					style={
						entries.status === "closed" && isLoggedIn
							? { sampleStyle }
							: {}
					}>
					{entries.origin ? entries.origin : "not specified"}
				</td>
				<td
					style={
						entries.status === "closed" && isLoggedIn
							? { sampleStyle }
							: {}
					}>
					{entries.contributor}
				</td>
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
							<th>Part of Speech</th>
							<th>Dialect</th>
							<th>Place of Origin</th>
							<th>Contributor</th>
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
				<div
					className='mobile-entry-container'
					style={isLoggedIn ? { height: "71vh" } : { height: "78vh" }}>
					{approvedEntries.map((entry) => {
						return (
							<div
								className='mobile-entry'
								onClick={() => {
									if (entry.status === "closed" && isLoggedIn) {
										setPreviewEntry(null);
									}
									// else if (isLoggedIn) {
									// 	setPreviewEntry(entry);
									// }
									else {
										setPreviewEntry(entry);
									}
								}}>
								<h3
									style={
										entry.status === "closed" && isLoggedIn
											? {
													color: "grey",
											  }
											: {}
									}>
									{entry.word}{" "}
									<i
										style={
											entry.status === "closed" && isLoggedIn
												? {
														color: "grey",
												  }
												: {}
										}>
										(
										{entry.figure_speech
											? entry.figure_speech
											: "not specified"}
										)
									</i>{" "}
								</h3>
								<p
									style={
										entry.status === "closed" && isLoggedIn
											? {
													color: "grey",
											  }
											: {}
									}>
									{entry.definition}
								</p>
							</div>
						);
					})}
				</div>
				{previewEntry && (
					<ModalReviewEntry
						isLoggedIn={isLoggedIn}
						activePage={activePage}
						modalHeaderText={
							isLoggedIn
								? "SAVE TO DICTIONARY"
								: "APPROVED ENTRY PREVIEW"
						}
						previewEntry={previewEntry}
						setPreviewEntry={setPreviewEntry}
						handleApproveEntry={handlePushToDictionary}
						confirmDialogText='Are you sure you want to add this entry to the dictionary?'
						confirmText='SAVE'
					/>
				)}
				{isLoggedIn && approvedEntries.length > 0 && (
					<div className='download-database-container'>
						<a
							href={`${AppConfiguration.url()}/api/get-database/dictionary.db`}>
							Download Database
						</a>
					</div>
				)}
			</>
		</>
	);
};

export const sampleStyle = {
	color: "grey",
	cursor: "auto",
};

export default ApprovedEntries;
