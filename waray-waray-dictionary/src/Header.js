import React, { useState } from "react";
import MenuIcon from "./Images/MenuIconFilled.png";

const Header = ({ admin, isLoggedIn, setIsLoggedIn }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();

		let isValid = false;
		for (let a = 0; a < admin.length; a++) {
			if (username === admin[a].username && password === admin[a].password) {
				setIsLoggedIn(true);
				sessionStorage.setItem("showLoginDialog", true);
				isValid = true;
				alert("Access Granted!");
			}
		}
		if (!isValid) {
			alert("Access Denied! Please try again!");
		}
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		sessionStorage.setItem("showLoginDialog", false);
	};

	return (
		<div className='header-container'>
			<h2>WARAY WARAY DICTIONARY PORTAL</h2>
			{/* <img
				src={MenuIcon}
				alt=''
				style={{ height: "35px", filter: "brightness(2)" }}
			/> */}
			{isLoggedIn ? (
				<div className='header-login-container'>
					<h4 style={{ color: "white", padding: "5px" }}>
						LOGGED-IN as ADMIN
					</h4>
					<button onClick={handleLogout}>LOGOUT</button>
				</div>
			) : (
				<form
					className='header-login-container'
					onSubmit={(e) => handleLogin(e)}>
					<input
						type='text'
						placeholder='Enter Username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						type='password'
						placeholder='Enter Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button onClick={(e) => handleLogin(e)}>LOGIN as ADMIN</button>
				</form>
			)}
		</div>
	);
};

export default Header;
