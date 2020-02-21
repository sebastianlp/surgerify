import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBarSpacer: theme.mixins.toolbar,
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    flexGrow: 1
  },
  mainContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

export default function Layout(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Header open={open} onDrawerCloseIconClick={handleDrawerOpen} />
      <Sidebar open={open} onDrawerCloseIconClick={handleDrawerClose} />
      <div className={classes.wrapper}>
        <main>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="xl" className={classes.mainContainer}>
            {props.children}
          </Container>
        </main>
        <Footer />
      </div>
    </div>
  );
}
