import React from "react";
import { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import axios from "axios";
import { PRODUCT_LIST_URL } from "../utils/keys/urls";
import useSearchStore from "../utils/store/SearchStore";
import { firestore } from "../utils/config/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import useDocStore from "../utils/store/DocStore";

function Searchbar() {
	const changeDoc = useDocStore((state) => state.changeDoc);
	const addSearchData = useSearchStore((state) => state.addSearchData);
	const [searchText, seTSearchText] = useState("");
	const [loading, setLoading] = useState(false);

	const handleEnter = (event) => {
		if (searchText.length === 0) return;
		if (event.key === "Enter") {
			setLoading(true);
			var searchTextArray = searchText.split(" ");
			var searchTextWithAdd = searchTextArray.join("+");
			const url = PRODUCT_LIST_URL + searchTextWithAdd;
			axios
				.get(url)
				.then((res) => {
					addSearchData(res.data.data);
					setLoading(false);
					addDoc(collection(firestore, "target_products"), {
						title: searchText,
						timestamp: Timestamp.now(),
						img: res.data.data[0].img,
						list: [],
					})
						.then((docRef) => {
							changeDoc(docRef.id);
							setLoading(false);
						})
						.catch((error) => {
							console.error("Error adding document: ", error);
							setLoading(false);
						});
				})
				.catch((err) => {
					setLoading(false);
				});
		}
	};
	return (
		<div className="w-screen items-center flex justify-center">
			<div className="w-fit flex items-center bg-slate-100 rounded-full px-3 mb-2">
				<RiSearch2Line size={20} />
				<input
					onChange={(e) => seTSearchText(e.target.value)}
					value={searchText}
					type="text"
					className=" bg-transparent text-md p-2 outline-none w-80"
					placeholder="Search ..."
					onKeyDown={handleEnter}
				/>
			</div>
			{loading && (
				<div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
					<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
				</div>
			)}
		</div>
	);
}

export default Searchbar;
