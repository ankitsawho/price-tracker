import React from "react";
import TrackCard from "./TrackCard";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { firestore } from "../utils/config/firebaseConfig";
import { useEffect, useState } from "react";

function Home() {
	const [targets, setTargets] = useState([]);
	useEffect(() => {
		const q = query(
			collection(firestore, "target_products"),
			orderBy("timestamp", "desc")
		);
		onSnapshot(q, (querySnapshot) => {
			setTargets(
				querySnapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			);
			console.log(targets);
		});
	}, []);
	return (
		<div className="flex items-center justify-center w-screen h-screen pt-64 pb-36 overflow-y-scroll">
			<div className="py-10 px-5 grid grid-cols-4 gap-4 overflow-auto">
				{targets.map((target) => {
					return <TrackCard key={target.id} target={target} />;
				})}
				<TrackCard />
			</div>
		</div>
	);
}

export default Home;
