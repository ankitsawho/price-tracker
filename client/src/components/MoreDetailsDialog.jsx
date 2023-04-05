import React from "react";
import useDetailStore from "../utils/store/DetailStore";
import { SiFlipkart, SiAmazon } from "react-icons/si";
import { FaStar } from "react-icons/fa";

function MoreDetailsDialog() {
	const toggle = useDetailStore((state) => state.toggleShowDetails);
	const details = useDetailStore((state) => state.details);
	const wipeData = useDetailStore((state) => state.wipeData);
	return (
		<div
			onClick={() => {
				toggle();
				wipeData();
			}}
			className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
		>
			<div className="bg-slate-100 w-3/4 h-3/4 rounded-xl p-5 overflow-scroll">
				<div>
					{details.site === "amazon" ? (
						<SiAmazon className=" text-amber-700" />
					) : (
						<SiFlipkart className=" text-blue-500" />
					)}
				</div>
				<div className="flex items-center justify-center my-5">
					<img src={details.img} alt={details.title} />
				</div>
				<div className="bg-slate-50 p-4 rounded-xl ">
					<h3 className="text-slate-700 font-bold">
						{details.title}
					</h3>
					<div className="flex items-center justify-start">
						<div className=" bg-green-600 text-slate-50 w-fit rounded-md text-xs px-1 flex items-center justify-center">
							<FaStar />
							<div className="w-1"></div>
							{details.rating}
						</div>
						<p className="ml-2 font-semibold text-slate-400 text-xs">
							{details.reviews}
						</p>
					</div>
					<p className=" font-thin text-2xl">{details.price}</p>
				</div>

				<div className="bg-slate-50 p-4 rounded-xl mt-5">
					<h3 className="text-slate-700 font-normal mb-1 flex space-x-3">
						<p>Discount: {details.discount}</p>
						<p>Real Price: {details.real_price}</p>
					</h3>
					<div className="flex items-center justify-start">
						<p className=" text-slate-500 text-sm">
							{details.desc}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MoreDetailsDialog;
