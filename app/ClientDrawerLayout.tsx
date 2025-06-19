"use client";
import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PaletteIcon from '@mui/icons-material/Palette';
import Link from 'next/link';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled, Theme } from '@mui/material/styles';
import { getCookie } from "cookies-next";

const drawerWidth = 220;
const miniDrawerWidth = 60;

const openedMixin = (theme: Theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden' as const,
});

const closedMixin = (theme: Theme) => ({
  width: miniDrawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden' as const,
});

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
    }),
    width: open ? drawerWidth : miniDrawerWidth,
    overflowX: 'hidden',
  },
}));

function DrawerContent({ open }: { open: boolean }) {
  const theme = useTheme();
  const cookieIconColor = (typeof window !== "undefined" && getCookie("iconColor")) || undefined;
  const iconColor =
    (theme as any).custom?.iconColor ||
    cookieIconColor ||
    theme.palette.primary.main;
  const drawerHoverColor = (theme as any).custom?.drawerHoverColor || theme.palette.action.hover;
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 3 }}>
        <img src="/next.svg" alt="Logo" style={{ width: 40, height: 'auto', transition: 'width 0.2s', ...(open ? { width: 120 } : {}) }} />
      </Box>
      <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={Link}
            href="/"
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              '&:hover': { backgroundColor: drawerHoverColor },
            }}
          >
            <ListItemIcon sx={{ color: iconColor, minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={Link}
            href="/page1"
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              '&:hover': { backgroundColor: drawerHoverColor },
            }}
          >
            <ListItemIcon sx={{ color: iconColor, minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Page 1" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={Link}
            href="/page2"
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              '&:hover': { backgroundColor: drawerHoverColor },
            }}
          >
            <ListItemIcon sx={{ color: iconColor, minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Page 2" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={Link}
            href="/theme-editor"
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              '&:hover': { backgroundColor: drawerHoverColor },
            }}
          >
            <ListItemIcon sx={{ color: iconColor, minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              <PaletteIcon />
            </ListItemIcon>
            <ListItemText primary="Theme Editor" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}

export default function ClientDrawerLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const cookieIconColor = (typeof window !== "undefined" && getCookie("iconColor")) || undefined;
  const iconColor =
    (theme as any).custom?.iconColor ||
    cookieIconColor ||
    theme.palette.primary.main;
  const drawerHoverColor = (theme as any).custom?.drawerHoverColor || theme.palette.action.hover;
  const drawerBg = theme.palette.background.paper;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMiniToggle = () => {
    setOpen((prev) => !prev);
  };

  const drawerKey = `${iconColor}-${drawerHoverColor}-${drawerBg}-${open}`;
  const mobileDrawerKey = `${iconColor}-${drawerHoverColor}-${drawerBg}-mobile`;

  return (
    <Box sx={{ display: 'flex' }}>
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      <Box
        component="nav"
        sx={{ width: { sm: open ? drawerWidth : miniDrawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="sidebar navigation"
      >
        {/* Mini variant drawer for desktop, temporary for mobile */}
        {isMobile ? (
          <Drawer
            key={mobileDrawerKey}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'block' },
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            <DrawerContent open={true} />
          </Drawer>
        ) : (
          <StyledDrawer key={drawerKey} variant="permanent" open={open}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: open ? 'flex-end' : 'center', px: [1] }}>
              <IconButton onClick={handleMiniToggle}>
                {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </Toolbar>
            <DrawerContent open={open} />
          </StyledDrawer>
        )}
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${(open && !isMobile) ? drawerWidth : miniDrawerWidth}px)` } }}
      >
        {isMobile && <Toolbar />}
        {children}
      </Box>
    </Box>
  );
} 