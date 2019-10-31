import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [user, setUser] = useState();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		setUser("Default");
		setUsers([...users, "Default"]);
	});

	const getChain = () => {};

	return (
		<div className="App">
			<p>Welcome</p>
			<button onSubmit={getChain}>Check Chain</button>
		</div>
	);
}

export default App;
