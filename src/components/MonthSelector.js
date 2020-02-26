import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function MonthSelector(props) {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} id="month-label">
        Mes
      </InputLabel>
      <Select
        labelId="month-label"
        id="month-select"
        value={props.selectedMonth}
        onChange={props.onMonthChange}
        labelWidth={labelWidth}
      >
        {generateMonths(props.selectedMonth).map(month => (
          <MenuItem
            key={month.key}
            value={month.monthValue}
            disabled={month.disabled}
          >
            {month.monthName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function generateMonths(selectedMonth) {
  const months = [];
  const today = new Date();

  for (let x = 0; x < 12; ++x) {
    const monthDate = new Date(today.getFullYear(), x, today.getDate());
    months.push({
      key: x,
      monthName: monthDate.toLocaleString("es-AR", { month: "long" }),
      monthValue: x,
      disabled: x > today.getMonth()
    });
  }

  return months;
}

export default MonthSelector;
