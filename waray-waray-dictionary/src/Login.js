import React, { useState } from "react";
import CloseIcon from "./Images/CloseIcon.png";

const Login = ({ setToggleLogin, admin, setIsLoggedIn }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const closeModal = () => {
		setToggleLogin(false);
	};

	const handleLogin = (e) => {
		e.preventDefault();
		let isValid = false;
		for (let a = 0; a < admin.length; a++) {
			if (username === admin[a].username && password === admin[a].password) {
				setIsLoggedIn(true);
				isValid = true;
				alert("Access Granted!");
				sessionStorage.setItem("showLoginDialog", true);
				closeModal();
			}
		}
		if (!isValid) {
			alert("Access Denied! Please try again!");
		}
	};

	return (
		<div className='modal-container'>
			<div className='overlay-style' onClick={closeModal}></div>
			<div className='verification-container'>
				<img
					className='close-icon'
					src={CloseIcon}
					alt='Close'
					onClick={closeModal}
				/>
				<div className='verification-container-header'>
					<h3>LOGIN as ADMIN</h3>
				</div>
				<form
					className='verification-container-form'
					onSubmit={(e) => handleLogin(e)}>
					<input
						autoFocus
						type='text'
						placeholder='Username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<div className='password-input'>
						<input
							type={"password"}
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button onClick={(e) => handleLogin(e)}>LOGIN</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
