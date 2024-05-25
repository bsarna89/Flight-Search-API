import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { navBarCopy } from "../copy/navBarCopy";

// MUI imports //
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function NavBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { header, menuItems } = navBarCopy;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = useCallback((page = undefined) => {
    page ? navigate(page) : setAnchorEl(null);
    setAnchorEl(null);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => {
              handleClose();
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleClose("/")}>
              {" "}
              {menuItems.home.text}
            </MenuItem>
            <MenuItem onClick={() => handleClose("/flights-table")}>
              {menuItems.flightsTable.text}
            </MenuItem>
            <MenuItem onClick={() => handleClose("/about-me")}>
              {menuItems.aboutMe.text}
            </MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {header}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
