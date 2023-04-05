import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import TrackDetailCard from "../components/TrackDetailCard";
import Graph from "../components/Graph";

function CategoryScreen() {
	const [targetList, setTargetList] = useState([]);
	const location = useLocation();
	useEffect(() => {
		setTargetList(location.state.target.data.list);
	}, []);
	return (
		<div className=" overflow-y-scroll h-screen pb-44 pt-11">
			<Graph />
			{targetList.map((target) => {
				return <TrackDetailCard key={target} link={target} />;
			})}
		</div>
	);
}

export default CategoryScreen;
