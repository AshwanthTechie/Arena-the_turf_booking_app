import React, { useContext } from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventIcon from '@mui/icons-material/Event';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { MyContext } from '../context/MyContext';

const UserCard = ({ open, onClose }) => {
  const drawerWidth = 250; 
  const { setLoginStatus, user, turf, turfLoginStatus, setTurfLoginStatus } = useContext(MyContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoginStatus(false); 
    setTurfLoginStatus(false);
    onClose(); 
    navigate("/");
  };

  const handleNavigateToFavourites = () => {
    if (user) {
      navigate(`/likedturfs/${user.userId}`);
    }
  };

  const list = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
      <Box sx={{ flexGrow: 1 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  turfLoginStatus
                    ? (
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {turf.name}
                        </Typography>
                        <Typography variant="body2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {turf.email}
                        </Typography>
                      </Box>
                    )
                    : user
                    ? (
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {user.name}
                        </Typography>
                        <Typography variant="body2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {user.email}
                        </Typography>
                      </Box>
                    )
                    : 'My Account'
                }
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            {turfLoginStatus ? (
              <Link to={`/turfbookings/${turf.turfId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemButton>
                  <ListItemIcon>
                    <EventIcon />
                  </ListItemIcon>
                  <ListItemText primary="Turf Bookings" />
                </ListItemButton>
              </Link>
            ) : user ? (
              <Link to={`/userbookings/${user.userId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemButton>
                  <ListItemIcon>
                    <EventIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Booking" />
                </ListItemButton>
              </Link>
            ) : (
              <ListItemButton disabled>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText primary="My Booking" />
              </ListItemButton>
            )}
          </ListItem>

          {!turfLoginStatus && (
            <ListItem disablePadding>
              <ListItemButton onClick={handleNavigateToFavourites}>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary="Favourite" />
              </ListItemButton>
            </ListItem>
          )}

          {turfLoginStatus && (
            <ListItem disablePadding>
              <Link to={`/manageturf`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemButton>
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Manage Turf" />
                </ListItemButton>
              </Link>
            </ListItem>
          )}
        </List>
      </Box>
      <Divider />
      <Box sx={{ flexShrink: 0 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={onClose}
      sx={{ width: drawerWidth, flexShrink: 0 }}
      PaperProps={{ style: { width: drawerWidth } }}
    >
      {list()}
    </Drawer>
  );
};

export default UserCard;
