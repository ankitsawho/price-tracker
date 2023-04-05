import React from "react";
import { useEffect } from "react";
import { IoMdPricetags } from "react-icons/io";
import { Link } from "react-router-dom";
import useUserStore from "../utils/store/UserStore";

function Navbar() {
	const user = useUserStore((state) => state.user);
	return (
		<div className="w-screen flex items-center justify-between">
			<div className=" text-slate-700 cursor-pointer m-5 flex items-center space-x-2 w-fit">
				<div>
					<IoMdPricetags size={30} />
				</div>
				<Link to="/">
					<div className="font-bold text-md">
						Price
						<br />
						Recommender
					</div>
				</Link>
			</div>
			<Link to="/account">
				<div className="bg-slate-100 shadow-lg py-1 pl-2 pr-4 rounded-full cursor-pointer m-5 text-slate-600 flex items-center space-x-2">
					<img
						src={user.photoURL}
						className="w-10 h-auto rounded-full"
					/>
					<div>
						<p className="font-bold text-sm">{user.displayName}</p>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default Navbar;
