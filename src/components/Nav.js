import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Card, Menu, MenuItem, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import uniqid from 'uniqid';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#0d48a1',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#0d48a1',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#0d48a1',
    },
    '&:hover fieldset': {
      borderColor: '#0d48a1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0d48a1',
    },
  },
});

export default function Nav({
  onChange,
  onZipSubmit,
  locations,
  anchorEl,
  onMenuClose,
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const menu = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: '#91cbf9' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box component="form" onSubmit={onZipSubmit}>
            <CustomTextField
              onChange={onChange}
              sx={{
                input: {
                  color: '#0d48a1',
                },
                mr: 2,
              }}
              size="small"
              label="Zipcode/City"
              id="basic-search"
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={menu}
              onClose={onMenuClose}
              MenuListProps={{
                'aria-labelledby': 'basic-search',
              }}
            >
              {locations.map((loc, index) => (
                <MenuItem
                  value={index}
                  key={uniqid()}
                  onClick={onMenuClose}
                >{`${loc.name}, ${loc.state}`}</MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box sx={{ backgroundColor: 'aliceblue', height: '100%' }}>
          <Container>
            <Card sx={{ padding: 3, margin: 2 }}>
              <Typography>Coming Soon: Favorite Locations</Typography>
            </Card>
          </Container>
        </Box>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
