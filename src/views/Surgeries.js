import React from "react";
import dayjs from "dayjs";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

import MonthSelector from "components/MonthSelector";

import { useUser } from "context/UserContext";
import { useSnackbar } from "context/SnackbarContext";
import { useLoader } from "context/LoaderContext";

import { getSurgeriesByUserAndMonth } from "services/surgeries";

import { generateAndDownloadFile, transformSurgery } from "domain/excel";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  paperActions: {
    marginBottom: theme.spacing(1)
  },
  containerActions: {
    display: "flex",
    justifyContent: "flexEnd"
  },
  tableContainer: {
    maxHeight: 644
  },
  table: {
    minWidth: 650
  }
}));

function Surgeries() {
  const classes = useStyles();
  const user = useUser();
  const addSnackbar = useSnackbar();
  const showLoader = useLoader();
  const [surgeries, setSurgeries] = React.useState([]);
  const [selectedMonth, setSelectedMonth] = React.useState(
    new Date().getMonth()
  );

  const requestForSurgeries = React.useCallback(
    month => {
      showLoader(true);
      getSurgeriesByUserAndMonth(user.uid, month)
        .then(response => {
          setSurgeries(response);
        })
        .catch(error => {
          console.error(error);
          addSnackbar(
            "Ops! Ocurrió un error obteniendo las cirugías! 😔",
            "error"
          );
        })
        .finally(() => showLoader(false));
    },
    [addSnackbar, showLoader, user.uid]
  );

  React.useEffect(() => {
    requestForSurgeries(selectedMonth);
  }, [selectedMonth, requestForSurgeries]);

  function handleMonthChange(e) {
    setSelectedMonth(e.target.value);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <MonthSelector
              onMonthChange={handleMonthChange}
              selectedMonth={selectedMonth}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<GetAppIcon />}
              onClick={() => {
                const today = new Date();
                const month = today.toLocaleString("es-AR", { month: "long" });

                return generateAndDownloadFile(
                  surgeries.map(transformSurgery),
                  `Cirugías ${month} ${today.getFullYear()}`
                );
              }}
            >
              Exportar
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
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
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default Surgeries;
