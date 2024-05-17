import { useNavigation } from "./useNavigation";

export const goto = (routeName, stateParams) => {
	const navigate = useNavigation();

	navigate.navigate(routeName, {
		state: stateParams,
	});
};
