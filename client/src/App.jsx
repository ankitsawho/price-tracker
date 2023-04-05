import React from "react";
import Navbar from "./components/Navbar";
import MoreDetailsDialog from "./components/MoreDetailsDialog";
import useDetailStore from "./utils/store/DetailStore";
import useUserStore from "./utils/store/UserStore";
import ProductSearch from "./components/ProductSearch";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Join from "./screens/Join";
import { useEffect, useState } from "react";
import Protected from "./screens/Protected";
import Error from "./screens/Error";
import Account from "./screens/Account";
import CategoryScreen from "./screens/CategoryScreen";

function App() {
	const showDetails = useDetailStore((state) => state.showDetails);
	const user = useUserStore((state) => state.user);
	const addUser = useUserStore((state) => state.addUser);

	useEffect(() => {
		const userData = localStorage.getItem("price-tracker-user");
		if (userData) {
			addUser(JSON.parse(userData));
		}
	}, []);

	return (
		<div className="w-screen h-screen overflow-hidden">
			{user ? <Navbar /> : null}
			<Routes>
				<Route exact path="/join" element={<Join />} />
				<Route
					exact
					path="/"
					element={<Protected Component={Home} />}
				/>
				<Route
					exact
					path="/search"
					element={<Protected Component={ProductSearch} />}
				/>
				<Route
					exact
					path="/account"
					element={<Protected Component={Account} />}
				/>
				<Route
					exact
					path="/track"
					element={<Protected Component={CategoryScreen} />}
				/>
				<Route path="*" element={<Error />} />
			</Routes>
			{showDetails ? <MoreDetailsDialog /> : null}
		</div>
	);
}

export default App;
