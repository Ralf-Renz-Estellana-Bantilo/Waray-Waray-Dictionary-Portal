import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const Navbar = ({ activePage, admin, isLoggedIn, setIsLoggedIn }) => {
	const [toggleLogin, setToggleLogin] = useState(false);

	const navigate = useNavigate();
	const push = (path) => {
		navigate(`${path}`);
	};

	// if (isLoggedIn) {
	// 	setToggleLogin(true);
	// }

	return (
		<>
			<div className='navbar-container'>
				<h3
					className={activePage === "EntryForm" ? "active-page" : ""}
					onClick={() => push("/")}>
					ENTRY FORM
				</h3>
				<h3
					className={
						activePage === "SubmittedEntries" ? "active-page" : ""
					}
					onClick={() => push("/submitted-entries")}>
					SUBMITTED ENTRIES
				</h3>
				<h3
					className={activePage === "ApprovedEntries" ? "active-page" : ""}
					onClick={() => push("/approved-entries")}>
					APPROVED ENTRIES
				</h3>
				<h3
					className={activePage === "ReviewEntries" ? "active-page" : ""}
					onClick={() => {
						push("/review-entries");
						if (!isLoggedIn) {
							setToggleLogin(true);
						}
					}}>
					REVIEW ENTRIES
				</h3>
			</div>
			{toggleLogin ? (
				<Login
					setToggleLogin={setToggleLogin}
					admin={admin}
					setIsLoggedIn={setIsLoggedIn}
				/>
			) : (
				""
			)}
		</>
	);
};

export default Navbar;
