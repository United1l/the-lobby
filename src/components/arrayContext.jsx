import { createContext, useReducer, useContext } from "react";

const ArrayContext = createContext(null);
const ArrayDispatchContext = createContext(null);

const ArrayContextProvider = ({ children }) => {
	const [array, dispatch] = useReducer(arrayReducer, initialArray);

	return(
		<ArrayContext.Provider value={array}>
			<ArrayDispatchContext.Provider value={dispatch}>
				{children}
			</ArrayDispatchContext.Provider>
		</ArrayContext.Provider>
		);
}

const initialArray = {
	preferences: [],
	userClubs: [],
};

const arrayReducer = (array, action) => {
	switch (action.type) {
		case 'Add': {
			return {...array, 
				preferences: [...action.arr, action.preference],
				userClubs: [...action.user, action.userClub],
			};
		}
		case 'Remove': {
			return {
				...array,
				preferences: action.arr.filter(i => i != action.preference),
				userClubs: action.user.filter(i => i != action.userClub),
			}
		}
	default: {
		throw Error('Unkown action:' + action.type)
		}
	}
}

const useArray = () => {
	return useContext(ArrayContext);
}

const useArrayDispatch = () => {
	return useContext(ArrayDispatchContext);
}

export { ArrayContextProvider, useArray, useArrayDispatch } 