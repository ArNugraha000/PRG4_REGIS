import axios from "axios";
import { getApiUrl } from "../utils/apiConfig";
const token = import.meta.env.VITE_TOKEN;

const fetchData = async (endpoint, options, type = {}) => {
	try {
		const response = await axios.get(getApiUrl(endpoint), {
			...options,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (type === "non-array") {
			return response.data[0];
		}
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};

const sendData = async (endpoint, options = {}) => {
	try {
		const response = await axios.post(getApiUrl(endpoint), options, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};

const postData = async (endpoint, options = {}) => {
	try {
		const response = await axios.post(getApiUrl(endpoint), null, {
			...options,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};

const fetchDataAndSetState = async (
	apiEndpoint,
	setDataCallback,
	options,
	type,
	setFilteredData
) => {
	try {
		const result = await fetchData(apiEndpoint, {
			...options,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (type === "non-array") {
			setDataCallback(result[0]);
		} else {
			setDataCallback(result);
			if (setFilteredData) {
				setFilteredData(result);
			}
		}
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

const uploadFile = (file) => {
	const currentTime =
		"MOB_" +
		new Date().getFullYear() +
		(new Date().getMonth() + 1) +
		new Date().getDate() +
		new Date().getHours() +
		new Date().getMinutes() +
		new Date().getSeconds();
	if (file != null) {
		const data = new FormData();
		data.append("UploadedImage", file);
		data.append("filename", currentTime);
		console.log("upload file", data);
		axios
			.post(getApiUrl("UploadFile"), data, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				// handle the response
			})
			.catch((error) => {
				// handle errors
				console.log(error);
			});

		return currentTime + file.name;
	} else {
		return "";
	}
};

export { fetchData, fetchDataAndSetState, sendData, uploadFile, postData };
