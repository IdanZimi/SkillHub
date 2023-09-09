import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { stack as BurgerMenu } from 'react-burger-menu'
import '../Menu.css'
import { logout } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse, faAddressCard, faPeopleGroup, faRightToBracket,
    faRightFromBracket, faUser
} from '@fortawesome/free-solid-svg-icons';
import Nav from '../../nav/nav';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';
import { redirect, useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const pages = ['About', 'Projects', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function SearchMenu({ setIsAuthenticated, isAauthenticated, logoutUserData, onSearch, showSearch }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [searchProject, setSearchProject] = React.useState('');

    const handleLogout = () => {
        //setIsAuthenticated(false);
        // Remove the authentication state from localStorage
        localStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false)
        logoutUserData()
        logout()
        handleCloseUserMenu()
    };

    const navigatePofile = () => {
        handleCloseUserMenu()
        console.log("hereeeeeeeee")
        redirect('/profile')
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSearchInput = (event) => {
        const searchText = event.target.value;
        setSearchProject(searchText);
        onSearch(searchText);
    };


    return (
        <AppBar position="fixed" sx={{ maxHeight: '55px' }}>
            <Container maxWidth="false">
                <Toolbar disableGutters>
                    <Diversity2OutlinedIcon sx={{ mr: 2 }}></Diversity2OutlinedIcon>
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href={isAauthenticated ? "/" : "/login"}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Roboto","Helvetica","Arial",sans-serif;',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        SKILLHUB
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button key={'about'}
                            href='/about'
                            sx={{ my: 2, color: 'white', display: 'block' }}>
                            About
                        </Button>
                        <Button key={'Projects'}
                            href='/projects'
                            sx={{ my: 2, color: 'white', display: 'block' }}>
                            Projects
                        </Button>
                    </Box>
                    {showSearch && (
                        <Search>
                            <>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={searchProject}
                                    onChange={handleSearchInput}
                                />
                            </>
                        </Search>
                    )}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip arrow title="Open settings">
                            <IconButton size='small' onClick={handleOpenUserMenu} sx={{ marginTop: 0 }}>
                                <Avatar alt="" src="/static/images/avatar/3.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem divider key={'Profile'}>
                                {/* <Typography textAlign="center"><FontAwesomeIcon icon={faUser} size='md' /> Profile</Typography> */}
                                <a id="profile" className="bm-item" href="/profile"><FontAwesomeIcon icon={faUser} size='md' /> Profile</a>

                            </MenuItem>
                            {/* <MenuItem key={'Logout'} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem> */}
                            {isAauthenticated ? (
                                <MenuItem key={'logout'} onClick={handleLogout}>
                                    <Typography textAlign="center"><FontAwesomeIcon icon={faRightFromBracket} size='md' /> Logout</Typography>
                                </MenuItem>
                            ) : (
                                <MenuItem key={'Login'}>
                                    {/* <Typography textAlign="center"> Login</Typography> */}
                                    <a id="login" className="bm-item" href="/login"><FontAwesomeIcon icon={faRightToBracket} size='md' /> Login</a>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}