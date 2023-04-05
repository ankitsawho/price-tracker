import React from "react";
import useUserStore from "../utils/store/UserStore";

function Account() {
	const wipeUser = useUserStore((state) => state.wipeUser);
	const user = useUserStore((state) => state.user);
	const handleLogout = () => {
		localStorage.removeItem("price-tracker-user");
		wipeUser();
		window.location.reload(false);
	};
	return (
		<div className="flex justify-center p-10 shadow-xl w-1/2 rounded-lg m-5">
			<div>
				<h1 className="text-2xl text-slate-500 font-bold p-6">
					Account
				</h1>
				{user && (
					<div className="flex items-center justify-around space-x-14">
						<img
							src={user.photoURL}
							alt="user"
							className="w-32 h-32 rounded-full"
						/>
						<div className=" bg-slate-100 p-10 rounded-lg">
							<p className="text-lg text-slate-800 font-medium">
								{user.displayName}
							</p>
							<p className="text-lg text-slate-600 font-light italic">
								{user.email}
							</p>
						</div>
					</div>
				)}

				<button
					className=" bg-red-300 px-6 py-2 mx-2 my-10 shadow-lg rounded-full"
					onClick={handleLogout}
				>
					Logout
				</button>
			</div>
		</div>
	);
}

export default Account;
