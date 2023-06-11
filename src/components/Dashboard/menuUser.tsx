import React from "react";
import { Button, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import {
  ExitToApp as ExitToAppIcon,
  Height,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useNavigate } from "react-router-dom";
import { Modal } from "@material-ui/core";
import { Infouser } from "./infouser";
interface Props {
  open?: boolean;
}


function MenuUser({ open }: Props) {
  const [openinfo, setOpeninfo] = React.useState(false);
  const handleOpen = () => setOpeninfo(true);
  const handleClose = () => setOpeninfo(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const cerrarsession = () => {
    localStorage.setItem("idEmpresa", "0");
    localStorage.setItem("authenticated", "false");
    navigate("/");
  };

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <Button
        onClick={handleMenuClick}
        sx={{
          width: "100%",
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <IconButton
          sx={{
            ml: 9,
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
          }}
        >
          <PersonPinIcon
            sx={{
              fontSize: 40,
              mr: open ? 2 : "left",
              justifyContent: "left",
            }}
          />
        </IconButton>
        <Typography
          sx={{
            opacity: open ? 10 : 0,
            mr: open ? 15 : "left",
          }}
        >
          Usuario
          <ArrowDropUpIcon
            sx={{
              fontSize: 20,
              color: "white",
            }}
          />
        </Typography>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        
      >
        <MenuItem onClick={handleOpen}>
          <SettingsIcon sx={{ mr: 1 }} />
          Configuración
        </MenuItem>
        <MenuItem onClick={cerrarsession}>
          <ExitToAppIcon sx={{ mr: 1 }} />
          Salir
        </MenuItem>
      </Menu>

      <Modal open={openinfo}>
        <Infouser onClose={handleClose} />
      </Modal>
    </div>
  );
}

export default MenuUser;
