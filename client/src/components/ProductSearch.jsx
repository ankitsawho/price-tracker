import React from "react";
import useSearchStore from "../utils/store/SearchStore";
import Searchbar from "./Searchbar";
import ProductCard from "./ProductCard";

function ProductSearch() {
	const searchData = useSearchStore((state) => state.searchResults);
	console.log(searchData);
	return (
		<div className="w-full h-screen">
			<Searchbar />
			<div className="overflow-scroll h-screen">
				<div className="w-full pt-10 px-5 grid grid-cols-4 gap-4">
					{searchData.map((item) => {
						return <ProductCard key={item.link} item={item} />;
					})}
				</div>
			</div>
		</div>
	);
}

export default ProductSearch;
