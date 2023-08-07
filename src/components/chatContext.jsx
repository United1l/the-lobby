import { useState, createContext, useContext } from "react";

const OpenChatContext = createContext(null);
const SetOpenChatContext = createContext(null);

const ChatContextProvider = ({ children }) => {
	const [openChat, setOpenChat] = useState({
		open: false,
		name: "",
	});

	return(
		<OpenChatContext.Provider value={openChat}>
			<SetOpenChatContext.Provider value={setOpenChat}>
				{children}
			</SetOpenChatContext.Provider>
		</OpenChatContext.Provider>
		);
}

const useOpenChat = () => {
	return useContext(OpenChatContext);
}

const useSetOpenChat = () => {
	return useContext(SetOpenChatContext);
}

export { ChatContextProvider, useOpenChat, useSetOpenChat } 