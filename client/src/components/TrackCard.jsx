import React from "react";
import { useState } from "react";
import { RiAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function TrackCard({ target }) {
	if (target) {
		return (
			<Link to="/track" state={{ target: target }}>
				<div className=" shadow-lg w-60 h-72 rounded-lg hover:opacity-60 ease-in-out duration-500 cursor-pointer">
					<div className="flex w-full h-full items-center justify-center">
						<img
							src={target.data.img}
							alt={target.data.title}
							className="w-full h-auto object-cover rounded-t-lg"
						/>
					</div>
				</div>
			</Link>
		);
	} else return <AddTrackCard />;
}

function AddTrackCard() {
	return (
		<Link to="/search">
			<div className="shadow-lg w-60 h-72 bg-slate-300 rounded-lg hover:opacity-60 ease-in-out duration-500 cursor-pointer">
				<div className="text-slate-500 flex items-center justify-center h-full">
					<RiAddFill size={100} />
				</div>
			</div>
		</Link>
	);
}

export default TrackCard;
