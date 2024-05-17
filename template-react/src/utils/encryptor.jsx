import CryptoJS from "crypto-js";

const secretKey = "PoltekAstra_ConfigurationKey";

export const encryptId = (text) => {
	return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decryptId = (cipherText) => {
	const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
	return bytes.toString(CryptoJS.enc.Utf8);
};
