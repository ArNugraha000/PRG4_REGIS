// useNavigation.jsx
import React, { useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
	const navigate = useNavigate();

	return (
		<NavigationContext.Provider value={navigate}>
			{children}
		</NavigationContext.Provider>
	);
};

export const useNavigation = () => {
	const navigate = useContext(NavigationContext);
	if (!navigate) {
		throw new Error("useNavigation must be used within a NavigationProvider");
	}
	return navigate;
};
