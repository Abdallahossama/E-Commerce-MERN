import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem("username")); // Update state when localStorage changes
    };
    handleStorageChange();
  });

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            onClick={() => navigate("/")}
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Teck Hub
          </Typography>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Teck Hub
          </Typography>
          {/* image */}
          {!username && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                onClick={() => navigate("/register")}
                variant="contained"
                style={{
                  zIndex: 3,
                  background: "white",
                  color: "#1976d2",
                  fontWeight: "600",
                }}
              >
                Sign Up
              </Button>
              <Button
                onClick={() => navigate("/login")}
                variant="contained"
                style={{
                  zIndex: 3,
                  background: "white",
                  color: "#1976d2",
                  fontWeight: "600",
                }}
              >
                log in
              </Button>
            </Box>
          )}
          {username && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={localStorage.getItem("username")!}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {" "}
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>Log Out</Typography>
                </MenuItem>{" "}
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>Orders</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
