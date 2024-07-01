import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import * as React from "react";
import { useTranslation } from "shared/i18n/config";

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const { t } = useTranslation();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const {
    user,
  } = useKindeBrowserClient();

  function getInitials() {
    const firstName = user?.given_name || "";
    const lastName = user?.family_name || "";
    return `${firstName[0] + lastName[0]}`;
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white" }} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Image src="/logo.png" width={150} height={150} alt="Ara logo" />
          <p style={{ color: "#16c0ff", marginLeft: 10 }}>Beta</p>

          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }} justifyContent="center" />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar onClick={handleOpenUserMenu} sx={{ bgcolor: "#008bbc" }}>{getInitials()}</Avatar>
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
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center"><LogoutLink>Log out</LogoutLink></Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
