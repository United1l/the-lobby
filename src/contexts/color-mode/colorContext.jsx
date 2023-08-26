import { useState, createContext, useContext } from "react";

const ColorContext = createContext(null);

const ColorContextProvider = props => {
	const colors = {
		primary: "#ff725e",
		secondaryOne: "",
		secondaryTwo: "",
	};

	return(
		<ColorContext.Provider value={colors}>
				{props.children}
		</ColorContext.Provider>
		);
}

const useColorContext = () => {
	return useContext(ColorContext);
}


export { ColorContextProvider, useColorContext } 