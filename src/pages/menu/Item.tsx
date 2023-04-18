import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";

interface Props {
  text: string;
  icon?: React.ReactElement<SvgIconProps>;
  open?: boolean;
}

function Item({ text, icon, open }: Props) {
  return (
    <ListItem>
      <ListItemButton
        sx={{
          "&:hover": {
            backgroundColor: 'rgba(198, 255, 193,0.2)',
            color: "white",
          },
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        {icon && (
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {icon}
          </ListItemIcon>
        )}
        <ListItemText
          sx={{
            opacity: open ? 1 : 0,
          }}
          primary={text}
        />
      </ListItemButton>
    </ListItem>
  );
}
export default Item;
