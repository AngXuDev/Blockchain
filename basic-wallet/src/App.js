import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
	const [user, setUser] = useState("None Selected");
	const [chain, setChain] = useState([]);
	const [values, setValues] = useState({});

	async function getChain(e) {
		e.preventDefault();
		try {
			const request = await axios.get("http://localhost:5000/chain");
			setChain(request.data.chain);
		} catch (error) {
			console.log(error);
			setChain([]);
		}
	}

	const handleChange = e => {
		e.persist();
		setValues(values => ({ ...values, [e.target.name]: e.target.value }));
	};

	const handleSubmit = e => {
		e.preventDefault();
		setUser(values.user);
	};

	const balance = chain.reduce(
		(a, c) =>
			a +
			c.transactions.filter(trn => trn.recipient === user).length -
			c.transactions.filter(trn => trn.sender === user).length,
		0
	);

	const transactions = chain.reduce(
		(a, c) =>
			a.concat(
				c.transactions.filter(
					trn => trn.recipient === user || trn.sender === user
				)
			),
		[]
	);

	return (
		<div className="App">
			<p>Welcome, Please Retrieve Complete Chain First</p>
			<p>Current User: {user}</p>
			<p>User Coin Balance: {balance} </p>
			<div>
				User Transactions:
				{transactions.map((trn, index) => {
					return (
						<div className="transaction" key={index}>
							*sender: {trn.sender}, recipient: {trn.recipient}, amount:{" "}
							{trn.amount}*
						</div>
					);
				})}
			</div>
			<form onSubmit={handleSubmit}>
				<label>
					User:
					<input
						type="text"
						name="user"
						value={values.user || ""}
						onChange={handleChange}
					/>
					<input type="submit" value="Submit" />
				</label>
			</form>
			<button onClick={getChain}>Retrieve Complete Chain</button>
			<div className="chain">
				{chain.map(block => {
					return (
						<div className="block" key={block.index}>
							<p>index: {block.index}</p>
							<p>previous hash: {block.previous_hash}</p>
							<p>proof: {block.proof}</p>
							<p>timestamp: {block.timestamp}</p>
							transactions:{" "}
							{block.transactions.map((trn, index) => {
								return (
									<div className="transaction" key={index}>
										*sender: {trn.sender}, recipient: {trn.recipient}, amount:{" "}
										{trn.amount}*
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
