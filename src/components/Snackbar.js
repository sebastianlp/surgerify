import React from "react";
import MuiSnackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function Snackbar(props) {
  return (
    <MuiSnackbar open={props.show} autoHideDuration={props.ttl}>
      <MuiAlert elevation={6} variant="filled" severity={props.severity}>
        {props.message}
      </MuiAlert>
    </MuiSnackbar>
  );
}
