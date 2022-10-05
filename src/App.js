import "./App.css";
import { useEffect, useState } from "react";

function App() {
	const [token, setToken] = useState(null);
	const [secretMessage, setSecretMessage] = useState("");

	useEffect(
		function () {
			fetch("/.netlify/functions/super-secret", {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
				.then((res) => res.json())
				.then((data) => setSecretMessage(data.message));
		},
		[token]
	);
	async function submitHandler(e) {
		e.preventDefault();
		try {
			const response = await fetch("/.netlify/functions/auth", {
				method: "POST",
				body: JSON.stringify({
					email: e.target.email.value,
					password: e.target.password.value,
				}),
			});
			if (response.status === 201) {
				const data = await response.json();
				setToken(data.token);
			} else {
			}
			const data = await response.json();
			setToken(data.token);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="App">
			<form onSubmit={submitHandler}>
				<div>
					<label>
						Email:
						<input
							type="email"
							name="email"
						/>
					</label>
				</div>
				<div>
					<label>
						Password:
						<input
							type="password"
							name="password"
						/>
					</label>
				</div>
				<button type="submit"> Log in</button>
			</form>
			<p>{token ? "du er logget ind  " : "du er ikke logget ind "}</p>
			<div>{secretMessage}</div>
		</div>
	);
}

export default App;
