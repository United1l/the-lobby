import { useState, useEffect, } from "react";
import { Box, Avatar, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon  from "@mui/icons-material/Search";
import DarkModeIcon  from "@mui/icons-material/DarkMode";
import LightModeIcon  from "@mui/icons-material/LightMode";
import SettingsIcon  from "@mui/icons-material/Settings";
import TextField from "@mui/material/TextField";
import { IconsWrapper } from "../iconWrapper.jsx";
import { SearchBox } from "./searchBox.jsx";
import { AccountSettings } from "./accountSettings.jsx";

const Header = props => {
	const bigScreen = props.bigScreen;
	const menu = props.menu;
	const setMenu = props.setMenu;
	const darkMode = props.darkMode;
	const setDarkMode = props.setDarkMode;
	const [search, setSearch] = useState(false);
	const [account, setAccount] = useState(false);
	const [img, setImg] = useState("");
	let displaySearch = 'none';
	let displayAccount = 'none';
	let iconsTheme = {
		wrapperBg: '#fff',
		iconBg: 'disabled',
	}

	let theme = {
		bg: '#fff',
	};

	const dark = <DarkModeIcon color={iconsTheme.iconBg} fontSize="small" />;
	const searchIcon = <SearchIcon color={iconsTheme.iconBg} fontSize="small" />;
	const userAvatar = <Avatar src={`Pictures/${img}`} alt={img} sx={{height:'30', width: '30', cursor: 'pointer'}} />;

	let themeSwitch = dark;

	const openMenu = e => {
		e.preventDefault();

		setMenu(!menu);
	}

	const handleThemeSwitch = e => {
		e.preventDefault();

		setDarkMode(!darkMode);
	}

	const openSearchB = e => {
		e.preventDefault();

		setSearch(!search);
	}

	const openAccSett = e => {
		e.preventDefault();

		setAccount(!account);
	}

	if (darkMode) {
		iconsTheme = {
			wrapperBg: '#adb5db',
			iconBg: '#fff',
		}
		theme.bg = '#6c757d';
		themeSwitch = <LightModeIcon color={iconsTheme.iconBg} fontSize="small" />;		
	} else {
		iconsTheme = {
			wrapperBg: '#fff',
			iconBg: 'disabled',
		}
		theme.bg = '#fff';
		themeSwitch = dark;
	}

	if (search) {
		displaySearch = 'flex'
	} else displaySearch = 'none';

	if (account) {
		displayAccount = 'flex'
	} else displayAccount = 'none';


	return (
		<Box sx={{height: '5%', width: '100%', display: 'flex', borderBottom: '0.5px solid #adb5db', 
			 alignItems: 'center'}}>
			<Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', 
			 alignSelf: 'flex-start', ml: '1rem', mt: '0.29rem'}}>
				<IconsWrapper bgColor={iconsTheme.wrapperBg} cursor="pointer" onClick={openMenu} bigScreen={bigScreen}>
					<MenuIcon color={iconsTheme.iconBg} fontSize="small" />
				</IconsWrapper>
			</Box>
			<Box sx={{position: 'absolute', right: '10px', width: '35%', display: 'flex', alignItems: 'center', 
				justifyContent: 'space-evenly'}}>
				<IconsWrapper bgColor={iconsTheme.wrapperBg} cursor="pointer" onClick={openSearchB}>{searchIcon}</IconsWrapper>
				<IconsWrapper bgColor={iconsTheme.wrapperBg} cursor="pointer" onClick={handleThemeSwitch}>{themeSwitch}</IconsWrapper>
				<Box sx={{height: '100%', display: 'flex', 
					alignItems: 'center',}}>
					<Badge
						overlap="circular"
						anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
						badgeContent={
							<SettingsIcon color="primary" sx={{fontSize: '16px'}} />
						}
						onClick={openAccSett}
					>
						{userAvatar}
					</Badge>					
				</Box>
			</Box>
			<SearchBox display={displaySearch} setSearch={setSearch} theme={theme} 
				searchIcon={searchIcon} bigScreen={bigScreen} />
			<AccountSettings display={displayAccount} userAvatar={userAvatar} setAccount={setAccount}
					theme={theme} bigScreen={bigScreen} setImg={setImg} />					
		</Box>
		);
}



export { Header }