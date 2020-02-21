import React from "react";
import clsx from "clsx";
import dayjs from "dayjs";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

import { useUser } from "context/UserContext";
import { useSnackbar } from "context/SnackbarContext";

import { getSurgeriesByUserId } from "services/surgeries";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  tableContainer: {
    maxHeight: 800
  }
}));

function Surgeries() {
  const classes = useStyles();
  const user = useUser();
  const addSnackbar = useSnackbar();
  const [surgeries, setSurgeries] = React.useState([]);

  React.useEffect(() => {
    getSurgeriesByUserId(user.uid)
      .then(response => {
        setSurgeries(response);
      })
      .catch(error => {
        console.error(error);
        addSnackbar(
          "Ops! Ocurrió un error obteniendo las cirugías! 😔",
          "error"
        );
      });
  }, [user.uid, addSnackbar]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={clsx(classes.paper, classes.tableContainer)}>
          <Table
            className={classes.table}
            stickyHeader
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Número de afiliado</TableCell>
                <TableCell align="right">Nombre del afiliado</TableCell>
                <TableCell align="right">Centro médico</TableCell>
                <TableCell align="right">Fecha de la cirugía</TableCell>
                <TableCell align="right">Médico cirujano</TableCell>
                <TableCell align="right">Obra social</TableCell>
                <TableCell align="right">Cirugía</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {surgeries.map(surgery => (
                <TableRow key={surgery.id}>
                  <TableCell component="th" scope="row">
                    {surgery.affiliate}
                  </TableCell>
                  <TableCell align="right">{surgery.affiliateName}</TableCell>
                  <TableCell align="right">{surgery.center}</TableCell>
                  <TableCell align="right">
                    {dayjs(surgery.date.toDate()).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell align="right">{surgery.doctor}</TableCell>
                  <TableCell align="right">{surgery.social}</TableCell>
                  <TableCell align="right">{surgery.surgery}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Surgeries;
