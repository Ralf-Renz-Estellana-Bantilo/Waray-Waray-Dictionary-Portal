import React from "react";

const ApprovalModal = ({
	approvedEntries,
	setOpenPreview,
	setApprovedEntries,
}) => {
	const handleSaveToDatabase = () => {
		if (window.confirm("Continue Saving...")) {
			setApprovedEntries([]);
			setOpenPreview(false);

			alert("Entries have been saved!");
		}
	};

	return (
		<div className='modal-container'>
			<div className='overlay-style' onClick={() => setOpenPreview(false)} />
			<div className='modal-style'>
				<div className='modal-header'>
					<h3 className='modal-sub-text'>Approved Entries to be Saved</h3>
					<div className='modal-close'></div>
				</div>
				<div className='approval-modal-container'>
					{approvedEntries.map((entry) => {
						return (
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									backgroundColor: "white",
									margin: "0 5px 5px 5px",
									padding: "5px",
								}}>
								<h3 style={{ fontSize: "16px" }}>
									{entry.word}{" "}
									<i style={{ fontWeight: "400", fontSize: "13px" }}>
										(
										{entry.figure_speech
											? entry.figure_speech
											: "not specified"}
										)
									</i>{" "}
								</h3>
								<p style={{ fontSize: "15px", marginLeft: "20px" }}>
									{entry.definition}
								</p>
							</div>
						);
					})}
				</div>
				<div className='modal-buttons'>
					<button
						className='modal-button-back'
						onClick={() => setOpenPreview(false)}
						style={{ width: "150px" }}>
						CANCEL
					</button>
					<button
						className='modal-button-send'
						onClick={handleSaveToDatabase}
						style={{ width: "150px" }}>
						SAVE
					</button>
				</div>
			</div>
		</div>
	);
};

export default ApprovalModal;
