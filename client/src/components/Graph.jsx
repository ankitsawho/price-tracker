import React from "react";
import useGraphStore from "../utils/store/GraphStore";
import { useEffect } from "react";
import { useState } from "react";
import ScatterPlot from "./ScatterPlot";
import ScatterPlotGraph from "./ScatterPlotGraph";

function Graph() {
	const [graphData, setGraphData] = useState([]);
	const data = useGraphStore((state) => state.data);
	useEffect(() => {
		console.log(data);
	}, [data]);
	return (
		<div className="flex items-center justify-center space-x-8">
			<ScatterPlot />
			<ScatterPlotGraph />
		</div>
	);
}

export default Graph;
