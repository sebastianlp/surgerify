import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    top: 0,
    left: 0,
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: "0.8",
    zIndex: theme.zIndex.tooltip,
    backgroundColor: theme.palette.common.black,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

export default function FullPageLoader() {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <CircularProgress />
    </Box>
  );
}
