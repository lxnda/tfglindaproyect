import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";

type HeaderProps = {
  title: string;
};

export const HeaderComponent: React.FC<HeaderProps> = ({
  title,
}) => {
  return (
    <Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%", mb:3 }}
      >
        <Grid item>
          <Typography variant="h5">{title}</Typography>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
};
