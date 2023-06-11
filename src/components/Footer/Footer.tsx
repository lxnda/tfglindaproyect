
import { Box, Link, Typography } from "@mui/material";
import React from "react";


function Copyright() {
    return (
      <Typography variant="body2" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
         About Moving
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
export default function Footer() {
  return (
    <>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 2  }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          About Moving
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Para cualquier información, contacta con nosotros
        </Typography>
        <Copyright />
      </Box>
    </>
  );
}
