import React, { useEffect, useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import TermsAndCondition from "./TermsAndCondition";

const EntryForm = ({
	activePage,
	setActivePage,
	addEntry,
	admin,
	isLoggedIn,
	setIsLoggedIn,
}) => {
	const [toggleTermsAndCondition, setToggleTermsAndCondition] =
		useState(false);
	const [isCheckboxOpen, setCheckboxOpen] = useState(false);
	const [word, setWord] = useState("");
	const [definition, setDefinition] = useState("");
	const [example, setExample] = useState("");
	const [figureOfSpeech, setFigureOfSpeech] = useState("");
	const [dialect, setDialect] = useState("");
	const [placeOfOrigin, setPlaceOfOrigin] = useState("");
	const [contributor, setContributor] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [phonetic_spelling, setPronounciation] = useState("");

	const showTermsAndCondition = () => {
		setToggleTermsAndCondition(true);
	};

	const hideTermsAndCondition = () => {
		setToggleTermsAndCondition(false);
	};

	const handleSubmitEntry = () => {
		if (window.confirm("Continue Submitting this Entry?")) {
			const id = Math.floor(Math.random() * 10000) + 1;

			let holdDialect = "";
			let holdPlaceOfOrigin = "";
			let holdFigureOfSpeech = "";
			if (dialect === "") {
				holdDialect = null;
			} else {
				holdDialect = dialect;
			}

			if (placeOfOrigin === "") {
				holdPlaceOfOrigin = null;
			} else {
				holdPlaceOfOrigin = placeOfOrigin;
			}

			if (figureOfSpeech === "") {
				holdFigureOfSpeech = null;
			} else {
				holdFigureOfSpeech = figureOfSpeech;
			}

			let entry = {
				word_ID: id,
				word: word,
				phonetic_spelling: phonetic_spelling,
				definition: definition,
				example_usage: example,
				figure_speech: holdFigureOfSpeech,
				dialect: holdDialect,
				origin: holdPlaceOfOrigin,
				contributor: contributor,
				email_address: emailAddress,
				word_speak: null,
				date: new Date(),
				filename: null,
			};

			addEntry(entry);
			resetFields();
		}
	};

	const resetFields = () => {
		setWord("");
		setDefinition("");
		setExample("");
		setFigureOfSpeech("");
		setDialect("");
		setPlaceOfOrigin("");
		setContributor("");
		setEmailAddress("");
		setPronounciation("");
		setToggleTermsAndCondition(false);
		setCheckboxOpen(false);
	};

	useEffect(() => {
		setActivePage("EntryForm");
	}, []);

	let isButtonEnabled = true;
	if (
		isCheckboxOpen === false ||
		word === "" ||
		phonetic_spelling === "" ||
		definition === "" ||
		example === "" ||
		contributor === "" ||
		emailAddress === ""
		// figureOfSpeech === "" ||
		// dialect === "" ||
		// placeOfOrigin === "" ||
		// file === null
	) {
		isButtonEnabled = false;
	}

	return (
		<>
			<Header
				admin={admin}
				isLoggedIn={isLoggedIn}
				setIsLoggedIn={setIsLoggedIn}
			/>
			<Navbar
				isLoggedIn={isLoggedIn}
				activePage={activePage}
				admin={admin}
				setIsLoggedIn={setIsLoggedIn}
			/>
			<div className='entry-form-container'>
				<div className='fields'>
					<label>WORD*:</label>
					<input
						required
						type='text'
						value={word}
						onChange={(e) => setWord(e.target.value)}
						placeholder='Enter Word'
					/>
				</div>
				<div className='fields'>
					<label>PHONETIC SPELLING (HOW TO PRONOUNCE)*:</label>
					<input
						required
						type='text'
						value={phonetic_spelling}
						onChange={(e) => setPronounciation(e.target.value)}
						placeholder='Ex: ma-u-pay or maúpay'
					/>
				</div>
				<div className='fields'>
					<label>DEFINITION*:</label>
					<textarea
						required
						type='text'
						value={definition}
						onChange={(e) => setDefinition(e.target.value)}
						placeholder='Enter Definition'
					/>
				</div>
				<div className='fields'>
					<label>EXAMPLE USAGE*:</label>
					<textarea
						required
						type='text'
						value={example}
						onChange={(e) => setExample(e.target.value)}
						placeholder='Enter Example Usage'
					/>
				</div>
				<div className='fields'>
					<label>FIGURE OF SPEECH:</label>
					<input
						required
						type='text'
						value={figureOfSpeech}
						onChange={(e) => setFigureOfSpeech(e.target.value)}
						placeholder='Enter Figure of Speech'
					/>
				</div>
				<div className='fields'>
					<label>DIALECT:</label>
					<input
						required
						type='text'
						value={dialect}
						onChange={(e) => setDialect(e.target.value)}
						placeholder='Enter Dialect'
					/>
				</div>
				<div className='fields'>
					<label>PLACE OF ORIGIN:</label>
					<input
						required
						type='text'
						value={placeOfOrigin}
						onChange={(e) => setPlaceOfOrigin(e.target.value)}
						placeholder='Enter Place of Origin'
					/>
				</div>
				<div className='fields'>
					<label>NAME OF CONTRIBUTOR*:</label>
					<input
						required
						type='text'
						value={contributor}
						onChange={(e) => setContributor(e.target.value)}
						placeholder='Enter Name of Contributor'
					/>
				</div>
				<div className='fields'>
					<label>EMAIL ADDRESS*:</label>
					<input
						required
						type='email'
						value={emailAddress}
						onChange={(e) => setEmailAddress(e.target.value)}
						placeholder='Enter Email Address'
					/>
				</div>
				<div className='fields'>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							columnGap: "10px",
							marginBottom: "10px",
						}}>
						{" "}
						<input
							type='checkbox'
							name=''
							id=''
							checked={isCheckboxOpen ? "checked" : ""}
							onChange={() => setCheckboxOpen(!isCheckboxOpen)}
						/>{" "}
						<span
							onClick={showTermsAndCondition}
							style={{
								textDecoration: "underline",
								color: "white",
								cursor: "pointer",
							}}>
							Terms and Condition
						</span>
					</div>

					<button
						disabled={isButtonEnabled ? "" : "disabled"}
						style={isButtonEnabled ? {} : { opacity: "0.8" }}
						onClick={handleSubmitEntry}>
						SUBMIT
					</button>
				</div>
			</div>

			{toggleTermsAndCondition ? (
				<TermsAndCondition closeTermsAndCondition={hideTermsAndCondition} />
			) : (
				""
			)}
		</>
	);
};

export default EntryForm;
