import React from "react";

const ModalReviewEntry = ({
	previewEntry,
	setPreviewEntry,
	handleApproveEntry,
}) => {
	// const audio = require(`../public/audio/${previewEntry.filename}`);

	const approveFunc = () => {
		if (window.confirm("Approval Confirmation")) {
			handleApproveEntry(previewEntry);
			setPreviewEntry(null);
		}
	};

	return (
		<div className='modal-container'>
			<div className='overlay-style' onClick={() => setPreviewEntry(null)} />
			<div className='modal-style'>
				<div className='modal-header'>
					<h3 className='modal-sub-text'>Review Entry</h3>
					<div className='modal-close'></div>
				</div>
				<div className='preview-entry-content'>
					<div className='entry-word'>
						<h2>{previewEntry.word}</h2>
						{/* <audio controls src={audio}>
							Your browser does not support the
							<code>audio</code> element.
						</audio> */}
					</div>
					<div className='entry-fields'>
						<div className='entry-field'>
							<h3>PHONETIC SPELLING</h3>
							<p>{previewEntry.phonetic_spelling}</p>
						</div>
						<div className='entry-field'>
							<h3>DEFINITION</h3>
							<p>{previewEntry.definition}</p>
						</div>
						<div className='entry-field'>
							<h3>EXAMPLE</h3>
							<p>{previewEntry.example_usage}</p>
						</div>
						<div className='entry-field'>
							<h3>FIGURE OF SPEECH</h3>
							<p>
								{previewEntry.figure_speech
									? previewEntry.figure_speech
									: "not specified"}
							</p>
						</div>
						<div className='entry-field'>
							<h3>DIALECT</h3>
							<p>
								{previewEntry.dialect
									? previewEntry.dialect
									: "not specified"}
							</p>
						</div>
						<div className='entry-field'>
							<h3>PLACE OF ORIGIN</h3>
							<p>
								{previewEntry.origin
									? previewEntry.origin
									: "not specified"}
							</p>
						</div>
						<div className='entry-field'>
							<h3>CONTRIBUTOR</h3>
							<p>{previewEntry.contributor}</p>
						</div>
					</div>
				</div>
				<div className='modal-buttons'>
					<button
						className='modal-button-back'
						onClick={() => setPreviewEntry(null)}
						style={{ width: "150px" }}>
						CLOSE
					</button>
					<button
						className='modal-button-send'
						onClick={approveFunc}
						style={{ width: "150px" }}>
						APPROVE
					</button>
				</div>
			</div>
		</div>
	);
};

export default ModalReviewEntry;
