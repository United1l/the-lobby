import { useState, createContext, useContext } from "react";

const OpenRecomContext = createContext(null);
const SetOpenRecomContext = createContext(null);

const RecommendedContextProvider = props => {
	const def = props.def;
	const [openRecom, setOpenRecom] = useState(def);

	return(
		<OpenRecomContext.Provider value={openRecom}>
			<SetOpenRecomContext.Provider value={setOpenRecom}>
				{props.children}
			</SetOpenRecomContext.Provider>
		</OpenRecomContext.Provider>
		);
}

const useOpenRecom = () => {
	return useContext(OpenRecomContext);
}

const useSetOpenRecom = () => {
	return useContext(SetOpenRecomContext);
}

export { RecommendedContextProvider, useOpenRecom, useSetOpenRecom } 