import React, { useEffect, useState } from "react";
import Header from "./Header";
import Login from "./Login";
import Navbar from "./Navbar";
import ModalReviewEntry from "./ModalReviewEntry";

const ReviewEntries = ({
	activePage,
	setActivePage,
	reviewEntries,
	admin,
	isLoggedIn,
	setIsLoggedIn,
	handleApproveEntry,
}) => {
	const [toggleLogin, setToggleLogin] = useState(true);
	const [previewEntry, setPreviewEntry] = useState(null);

	useEffect(() => {
		setActivePage("ReviewEntries");
	}, []);

	let listOfReviewEntries = reviewEntries.map((entries, index) => {
		return (
			<tr
				className='review-row'
				key={index}
				style={{ cursor: "pointer" }}
				onClick={() => setPreviewEntry(entries)}>
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
			<div className='review-entries-container'>
				{isLoggedIn && (
					<>
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
							{listOfReviewEntries}
						</table>
						{isLoggedIn && reviewEntries.length < 1 && (
							<p
								style={{
									width: "100%",
									backgroundColor: "red",
									textAlign: "center",
									padding: "10px",
									color: "white",
								}}>
								No entries to be reviewed!
							</p>
						)}
						<div
							className='mobile-entry-container'
							style={
								isLoggedIn ? { height: "71vh" } : { height: "78vh" }
							}>
							{reviewEntries.map((entry) => {
								return (
									<div
										className='mobile-entry'
										onClick={() => setPreviewEntry(entry)}>
										<h3 style={{ fontSize: "16px" }}>
											{entry.word}{" "}
											<i
												style={{
													fontWeight: "400",
													fontSize: "13px",
												}}>
												(
												{entry.figure_speech
													? entry.figure_speech
													: "not specified"}
												)
											</i>{" "}
										</h3>
										<p
											style={{
												fontSize: "15px",
												marginLeft: "20px",
											}}>
											{entry.definition}
										</p>
									</div>
								);
							})}
						</div>
					</>
				)}
				{toggleLogin && !isLoggedIn && (
					<Login
						setToggleLogin={setToggleLogin}
						admin={admin}
						setIsLoggedIn={setIsLoggedIn}
					/>
				)}
				{!toggleLogin && !isLoggedIn && (
					<h1 style={{ textAlign: "center" }}>ACCESS DENIED</h1>
				)}
			</div>

			{previewEntry && (
				<ModalReviewEntry
					isLoggedIn={isLoggedIn}
					activePage={activePage}
					modalHeaderText='REVIEW ENTRY'
					previewEntry={previewEntry}
					setPreviewEntry={setPreviewEntry}
					handleApproveEntry={handleApproveEntry}
					confirmDialogText='Approval Confirmation, Wanna continue?'
					confirmText='APPROVE'
				/>
			)}
		</>
	);
};

export default ReviewEntries;
