import React, { useState } from "react";
import Login from "./Login";

const Header = ({ admin, isLoggedIn, setIsLoggedIn }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [toggleLogin, setToggleLogin] = useState(false);

	const handleLogin = (e) => {
		e.preventDefault();

		let isValid = false;
		for (let a = 0; a < admin.length; a++) {
			if (username === admin[a].username && password === admin[a].password) {
				setIsLoggedIn(true);
				sessionStorage.setItem("showLoginDialog", true);
				isValid = true;
				setUsername(null);
				setPassword(null);
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
			{isLoggedIn ? (
				<div className='header-login-container'>
					<h4
						className='login-indicator'
						style={{ color: "white", padding: "5px" }}>
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

			<div className='mobile-login-container'>
				{isLoggedIn ? (
					<button
						onClick={() => {
							if (window.confirm("Continue Logging out?")) {
								handleLogout();
							}
						}}>
						LOGOUT
					</button>
				) : (
					<button onClick={() => setToggleLogin(true)}>LOGIN</button>
				)}
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
		</div>
	);
};

export default Header;
