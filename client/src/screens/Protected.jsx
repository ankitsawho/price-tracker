import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
	const { Component } = props;
	const navigate = useNavigate();
	const user = localStorage.getItem("price-tracker-user");
	useEffect(() => {
		if (!user) {
			navigate("/join");
		}
	}, []);
	return (
		<div>
			<Component />
		</div>
	);
}

export default Protected;
