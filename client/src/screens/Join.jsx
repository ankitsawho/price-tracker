import React from "react";
import { auth, provider } from "../utils/config/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../utils/store/UserStore";
import { IoMdPricetags } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";

function Join() {
	const navigate = useNavigate();
	const addUser = useUserStore((state) => state.addUser);
	const user = useUserStore((state) => state.user);

	const handleSignIn = () => {
		signInWithPopup(auth, provider)
			.then((data) => {
				const userData = {
					uid: data.user.uid,
					displayName: data.user.displayName,
					email: data.user.email,
					photoURL: data.user.photoURL,
				};
				localStorage.setItem(
					"price-tracker-user",
					JSON.stringify(userData)
				);
				addUser(userData);
				window.location.reload(false);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		const userData = localStorage.getItem("price-tracker-user");
		if (userData) {
			navigate("/");
		}
	}, []);

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div className=" scale-150 text-slate-700 cursor-pointer p-5 flex items-center space-x-2 w-fit">
				<div>
					<IoMdPricetags size={30} />
				</div>
				<div className="font-bold text-md">
					Price
					<br />
					Recommender
				</div>
			</div>
			<button
				className="p-3 m-10 rounded-full shadow-lg flex items-center justify-center space-x-3"
				onClick={handleSignIn}
			>
				<FcGoogle size={30} />
				Sign in with Google
			</button>
		</div>
	);
}

export default Join;
