import { useState, useEffect, } from "react";
import { Box, Button, Grid, InputAdornment, Avatar, Badge, Divider } from "@mui/material";
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
	const clubs = props.clubs;
	const menu = props.menu;
	const setMenu = props.setMenu;
	const darkMode = props.darkMode;
	const setDarkMode = props.setDarkMode;
	const [search, setSearch] = useState(false);
	const [account, setAccount] = useState(false);
	let displaySearch = 'none';
	let displayAccount = 'none';
	let iconsTheme = {
		wrapperBg: 'white',
		iconBg: 'disabled',
	}

	let theme = {
		bg: 'white',
		textColor: 'black',
	};

	const dark = <DarkModeIcon color={iconsTheme.iconBg} fontSize="small" />;
	const searchIcon = <SearchIcon color={iconsTheme.iconBg} fontSize="small" />;
	const userAvatar = <Avatar src={""} alt={""} sx={{height:'30', width: '30', cursor: 'pointer'}} />;

	let themeSwitch = dark;

	const handleClick = e => {
		e.preventDefault();

		setMenu(true);
	}

	const handleThemeSwitch = e => {
		e.preventDefault();

		setDarkMode(!darkMode);
	}

	const openSearchB = e => {
		e.preventDefault();

		setSearch(true);
	}

	const openAccSett = e => {
		e.preventDefault();

		setAccount(true);
	}

	if (darkMode) {
		iconsTheme = {
			wrapperBg: 'gray',
			iconBg: 'white',
		}
		theme.bg = 'black';
		theme.textColor = 'white';
		themeSwitch = <LightModeIcon color={iconsTheme.iconBg} fontSize="small" />;		
	} else {
		iconsTheme = {
			wrapperBg: 'white',
			iconBg: 'disabled',
		}
		theme.bg = 'white';
		theme.textColor = 'black';
		themeSwitch = dark;
	}

	if (search) {
		displaySearch = 'flex'
	} else displaySearch = 'none';

	if (account) {
		displayAccount = 'flex'
	} else displayAccount = 'none';


	return (
		<Box sx={{height: '5%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', borderBottom: '1px solid gray'}}>
			<Box sx={{width: '30%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
				<IconsWrapper bgColor={iconsTheme.wrapperBg} cursor="pointer" onClick={handleClick} bigScreen={bigScreen} >
					<MenuIcon color={iconsTheme.iconBg} fontSize="small" />
				</IconsWrapper>
			</Box>
			<h3>{/*Some sidebar item title*/}</h3>
			<Box sx={{position: 'absolute', right: '2%', width: '30%', display: 'flex', alignItems: 'center', 
				justifyContent: 'space-evenly'}}>
				<IconsWrapper bgColor={iconsTheme.wrapperBg} cursor="pointer" onClick={openSearchB}>{searchIcon}</IconsWrapper>
				<IconsWrapper bgColor={iconsTheme.wrapperBg} cursor="pointer" onClick={handleThemeSwitch}>{themeSwitch}</IconsWrapper>
				<Box sx={{width: '35%', height: '100%', display: 'flex', 
					alignItems: 'center',}}>
					<Badge
						overlap="circular"
						anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
						badgeContent={
							<SettingsIcon color={iconsTheme.iconBg} sx={{fontSize: '16px'}} />
						}
						onClick={openAccSett}
					>
						{userAvatar}
					</Badge>					
				</Box>
			</Box>
			<SearchBox display={displaySearch} setSearch={setSearch} theme={theme} 
				searchIcon={searchIcon} clubs={clubs} />
			<AccountSettings display={displayAccount} userAvatar={userAvatar} setAccount={setAccount}
					theme={theme} bigScreen={bigScreen} />					
		</Box>
		);
}



export { Header }