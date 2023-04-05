import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import useGraphStore from "../utils/store/GraphStore";

function TrackDetailCard({ link }) {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);
	const addData = useGraphStore((state) => state.addData);

	const url = "http://127.0.0.1:5000/track?link=" + link;
	useEffect(() => {
		setLoading(true);
		axios
			.get(url)
			.then((res) => {
				setData(res.data.data);
				addData(res.data.data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
			});
	}, []);

	if (loading) return <Loading />;
	if (data == null) return <div></div>;
	console.log(data.title);
	if (data.title == undefined) return <div></div>;
	return (
		<div className="w-screen pb-1 px-3 flex justify-center items-center">
			<div className="bg-white w-9/12 h-full rounded-xl shadow-lg p-3 flex items-center justify-between">
				<div>
					<h1 className=" text-slate-700 text-xl font-semibold">
						{data.title}
					</h1>
					<span className=" font-extralight text-3xl">
						{data.price}
					</span>
					<br />
					<span>Discount : {data.discount}</span>
					<br />
					<span>Real Price : {data.real_price}</span>
					<br />
				</div>
				<div>
					<div className=" bg-green-600 w-20 h-20 text-slate-50 rounded-md text-lg px-1 flex items-center justify-center">
						<FaStar />
						<div className="w-1"></div>
						{data.star}
					</div>
					<span className="font-semibold text-slate-400 text-md flex justify-center items-center pt-2">
						{data.ratings}
					</span>
				</div>
			</div>
		</div>
	);
}

const Loading = () => {
	return (
		<div className="flex justify-center items-center p-3 m-2">
			<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
		</div>
	);
};

export default TrackDetailCard;
