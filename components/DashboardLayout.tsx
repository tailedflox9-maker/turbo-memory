import React, { useState } from 'react';
import { 
    Box, AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, 
    ListItemButton, ListItemIcon, ListItemText, Avatar, Divider, useTheme, useMediaQuery 
} from '@mui/material';
import { 
    Menu as MenuIcon, Dashboard as DashboardIcon, People as PeopleIcon, Store as StoreIcon, 
    Settings as SettingsIcon, Analytics as AnalyticsIcon, Notifications as NotificationsIcon 
} from '@mui/icons-material';

const navItems = [
    { text: 'Overview', icon: <DashboardIcon /> },
    { text: 'Users', icon: <PeopleIcon /> },
    { text: 'Businesses', icon: <StoreIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
];

const drawerWidth = 240;

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerContent = (
        <div>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <AnalyticsIcon color="primary" sx={{ fontSize: 30 }} />
                <Typography variant="h6" component="h1" noWrap>
                    Analytics
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {navItems.map((item, index) => (
                    <ListItem key={item.text} disablePadding sx={{ p: '4px 8px' }}>
                        <ListItemButton selected={index === 0} sx={{ borderRadius: '8px' }}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ flexGrow: 1 }} />
            <Divider />
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>A</Avatar>
                <Box sx={{ ml: 2 }}>
                    <Typography variant="body2" fontWeight="bold">Admin User</Typography>
                    <Typography variant="caption" color="text.secondary">admin@jawala.dev</Typography>
                </Box>
            </Box>
        </div>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <AppBar 
                position="fixed"
                sx={{ 
                    width: { lg: `calc(100% - ${drawerWidth}px)` },
                    ml: { lg: `${drawerWidth}px` },
                    bgcolor: 'background.paper',
                    color: 'text.primary'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { lg: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color="inherit">
                        <NotificationsIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            
            <Box
                component="nav"
                sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
            >
                {/* Mobile Drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: 'background.paper' },
                    }}
                >
                    {drawerContent}
                </Drawer>
                {/* Desktop Drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', lg: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: 'background.paper', borderRight: '1px solid #374151' },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>
            
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { lg: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};