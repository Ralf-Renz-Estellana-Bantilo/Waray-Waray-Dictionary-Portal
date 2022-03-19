import React from "react";
import "./TermsAndCondition.css";
import CloseIcon from "./Images/CloseIcon.png";

const TermsAndCondition = ({ closeTermsAndCondition }) => {
	return (
		<div className='modal-container'>
			<div className='overlay-style' />
			<div className='modal-style'>
				<div className='modal-header'>
					<h3 className='modal-sub-text'>Terms and Condition</h3>
					<div className='modal-close'>
						<img
							className='closeIcon'
							src={CloseIcon}
							alt='Close'
							onClick={closeTermsAndCondition}
						/>
					</div>
				</div>
				<h1 className='modal-text'>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Recusandae, autem aliquam quasi ullam ad fugiat non, doloremque
					tempore, ducimus architecto commodi deserunt excepturi laboriosam
					labore. Quos, ex. Odit, eaque totam! Voluptates perferendis
					nesciunt eos? Fuga dolore aspernatur sit asperiores, eveniet quae
					earum ratione, id laudantium et, rem maxime? Asperiores adipisci
					voluptatem itaque eum soluta provident, mollitia quas dolorum sed
					molestiae? Nam sequi pariatur illo numquam ullam explicabo minima
					atque adipisci tenetur, corporis architecto nobis delectus quis
					placeat.
				</h1>
				{/* <div className='modal-buttons'>
					<button className='modal-button-back'>Cancel</button>
					<button
						className='modal-button-send'
						// onClick={(e) => {
						// 	props.history.push(props.path);
						// 	props.confirm(e);
						// }}
					>
						Send
					</button>
				</div> */}
			</div>
		</div>
	);
};

export default TermsAndCondition;
