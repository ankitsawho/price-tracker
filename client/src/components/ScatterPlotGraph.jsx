import React from "react";
import {
	Chart as ChartJS,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const options = {
	scales: {
		y: {
			beginAtZero: true,
		},
	},
};

const data = {
	datasets: [
		{
			label: "No. of Reviews / Price",
			data: Array.from({ length: 100 }, () => ({
				x: faker.datatype.number({ min: 100, max: 700 }),
				y: faker.datatype.number({ min: 50, max: 2000 }),
			})),
			backgroundColor: "rgba(255, 99, 132, 1)",
		},
	],
};

function ScatterPlotGraph() {
	return (
		<div className="">
			<Scatter options={options} data={data} />
		</div>
	);
}

export default ScatterPlotGraph;
