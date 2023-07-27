import { useState, createContext, useContext } from "react";

const IdContext = createContext(null);
const SetIdContext = createContext(null);

const UserContextProvider = ({ children }) => {
	const [id, setId] = useState(1);

	return(
		<IdContext.Provider value={id}>
			<SetIdContext.Provider value={setId}>
				{children}
			</SetIdContext.Provider>
		</IdContext.Provider>
		);
}

const useId = () => {
	return useContext(IdContext);
}

const useSetId = () => {
	return useContext(SetIdContext);
}

export { UserContextProvider, useId, useSetId } 