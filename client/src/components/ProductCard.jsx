import React from "react";
import { SiFlipkart, SiAmazon } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import useDetailStore from "../utils/store/DetailStore";
import { useState } from "react";
import useDocStore from "../utils/store/DocStore";
import { firestore } from "../utils/config/firebaseConfig";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

function ProductCard({ item }) {
	console.log();
	const [isTracked, setIsTracked] = useState(false);
	const toggle = useDetailStore((state) => state.toggleShowDetails);
	const addDetails = useDetailStore((state) => state.addDetails);
	const docId = useDocStore((state) => state.doc);

	const handleTrack = () => {
		if (!isTracked) {
			const docRef = doc(firestore, "target_products", docId);
			updateDoc(docRef, {
				list: arrayUnion(item.link),
			})
				.then(() => {
					setIsTracked(!isTracked);
				})
				.catch((err) => {});
		} else {
			const docRef = doc(firestore, "target_products", docId);
			updateDoc(docRef, {
				list: arrayRemove(item.link),
			})
				.then(() => {
					setIsTracked(!isTracked);
				})
				.catch((err) => {});
		}
	};

	const showMoreDetails = () => {
		toggle();
		const url =
			"http://127.0.0.1:5000/details?site=" +
			item.site +
			"&link=" +
			item.link;
		axios
			.get(url)
			.then((res) => {
				const details = { ...item, ...res.data.data };
				addDetails(details);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="bg-slate-100 cursor-pointer hover:bg-opacity-50 m-2 p-3 rounded-lg shadow-xl flex-col items-start justify-between hover:scale-110 ease-in-out duration-300">
			<div>
				{item.site === "amazon" ? (
					<SiAmazon className=" text-amber-700" />
				) : (
					<SiFlipkart className=" text-blue-500" />
				)}
			</div>
			<div
				onClick={showMoreDetails}
				className="flex items-center justify-center my-5"
			>
				<img src={item.img} alt={item.title} />
			</div>
			<div
				onClick={showMoreDetails}
				className="bg-slate-50 p-4 rounded-xl "
			>
				<h3 className="text-slate-700 font-bold truncate md:text-clip">
					{item.title}
				</h3>
				<div className="flex items-center justify-start">
					<div className=" bg-green-600 text-slate-50 w-fit rounded-md text-xs px-1 flex items-center justify-center">
						<FaStar />
						<div className="w-1"></div>
						{item.rating}
					</div>
					<p className="ml-2 font-semibold text-slate-400 text-xs">
						{item.reviews}
					</p>
				</div>
				<p className=" font-thin text-2xl">{item.price}</p>
			</div>
			<div className="flex items-center justify-center">
				{!isTracked ? (
					<button
						onClick={handleTrack}
						className="bg-blue-400 m-4 text-sm rounded-lg px-3 py-1 text-blue-50"
					>
						Track
					</button>
				) : (
					<button
						onClick={handleTrack}
						className="bg-red-400 m-4 text-sm rounded-lg px-3 py-1 text-blue-50"
					>
						Untrack
					</button>
				)}
				<a
					className="text-xs underline"
					target="_blank"
					href={item.link}
				>
					Visit Website
				</a>
			</div>
		</div>
	);
}

export default ProductCard;
