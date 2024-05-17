// helpers.js

import { getApiUrlFile } from "./apiConfig";
import NoImageHuman from "../assets/IMG_NoImageHuman.png";

export const handleFileChange = (ref) => {
	const file = ref.current.files[0];
	console.log("file", file);
	const fileType = file.name.split(".").pop();
	if (
		file.size / 1000000 > 10 ||
		!["png", "jpg", "jpeg", "mp4"].includes(fileType)
	) {
		alert("File size must be less than 3.5MB and in PNG, JPG, or JPEG format");
		ref.current.value = "";
	}
};

export function getUrlImage(data, noimage) {
	if (data && data !== "") {
		if (data.includes("http")) {
			return data;
		} else {
			return getApiUrlFile(data);
		}
	} else {
		return NoImageHuman;
	}
}

export const handleSetCurrentPage =
	(setCurrentPage, setLoading, setCurrentFilter) => (newCurrentPage) => {
		setLoading(true);
		setCurrentPage(newCurrentPage);
		setCurrentFilter((prevFilter) => ({
			...prevFilter,
			page: newCurrentPage,
		}));
	};

export const handleSearch =
	(
		setLoading,
		setCurrentFilter,
		searchQuery,
		searchFilterSort,
		searchFilterStatus
	) =>
	() => {
		setLoading(true);
		setCurrentFilter((prevFilter) => ({
			...prevFilter,
			query: searchQuery.current.value,
			sort: searchFilterSort.current.value,
			status: searchFilterStatus.current.value,
		}));
	};

export const handleSearchArtikel =
	(setLoading, setCurrentFilter, searchQuery) => () => {
		setLoading(true);
		setCurrentFilter((prevFilter) => ({
			...prevFilter,
			query: searchQuery.current.value,
		}));
	};

export const handleKeyDown = (handleSearch) => (event) => {
	if (event.key === "Enter") {
		handleSearch();
	}
};
