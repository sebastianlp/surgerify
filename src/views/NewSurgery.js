import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import DayjsUtils from '@date-io/dayjs';
import dayjs from 'dayjs';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import FormikAutocomplete from 'components/FormikAutocomplete';

import { getCenters } from 'services/centers';
import { getDoctors } from 'services/doctors';
import { getSocials } from 'services/socials';
import { newSurgery } from 'services/surgeries';
import { getSurgeryTypes } from 'services/surgeryTypes';

import { useLoader } from 'context/LoaderContext';
import { useUser } from 'context/UserContext';
import { useSnackbar } from 'context/SnackbarContext';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

function NewSurgery() {
  const classes = useStyles();
  const showLoader = useLoader();
  const user = useUser();
  const addSnackbar = useSnackbar();
  const [centers, setCenters] = React.useState([]);
  const [doctors, setDoctors] = React.useState([]);
  const [socials, setSocials] = React.useState([]);
  const [surgeryTypes, setSurgeryTypes] = React.useState([]);

  React.useEffect(() => {
    showLoader(true);

    async function fetchInitialData() {
      const centers = await getCenters();
      const doctors = await getDoctors();
      const socials = await getSocials();
      const surgeryTypes = await getSurgeryTypes();
      setCenters(centers);
      setDoctors(doctors);
      setSocials(socials);
      setSurgeryTypes(surgeryTypes);
      showLoader(false);
    }

    fetchInitialData();
  }, [showLoader]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={clsx(classes.paper, classes.tableContainer)}>
          <Formik
            initialValues={{
              affiliate: '',
              affiliateName: '',
              center: '',
              date: dayjs(),
              doctor: '',
              social: '',
              surgery: '',
            }}
            validationSchema={Yup.object({
              affiliate: Yup.string().required('Requerido'),
              affiliateName: Yup.string().required('Requerido'),
              center: Yup.string().required('Requerido'),
              date: Yup.date().required('Requerido'),
              doctor: Yup.string().required('Requerido'),
              social: Yup.string().required('Requerido'),
              surgery: Yup.string().required('Requerido'),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              showLoader(true);
              setSubmitting(true);
              newSurgery({
                ...values,
                date: new Date(values.date.toDate()),
                userId: user.uid,
              })
                .then(resp => {
                  resetForm();
                  addSnackbar('Cirugía guardad con éxito', 'success');
                })
                .catch(err => {
                  console.error(err);
                  addSnackbar(
                    'Ops! Ocurrió un error guardando la cirugía! 😔',
                    'error'
                  );
                })
                .finally(() => {
                  showLoader(false);
                  setSubmitting(false);
                });
            }}>
            {({ isSubmitting }) => (
              <Form>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Field name="date">
                      {({ field, form, meta }) => (
                        <MuiPickersUtilsProvider utils={DayjsUtils} locale="es">
                          <KeyboardDatePicker
                            margin="normal"
                            label="Fecha de la cirugía"
                            format="DD/MM/YYYY"
                            value={field.value}
                            onChange={value =>
                              form.setFieldValue(field.name, value)
                            }
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error}
                          />
                        </MuiPickersUtilsProvider>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="affiliate">
                      {({ field, form, meta }) => (
                        <TextField
                          {...field}
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          label="Número de afiliado"
                          error={meta.touched && !!meta.error}
                          helperText={meta.touched && meta.error}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="affiliateName">
                      {({ field, form, meta }) => (
                        <TextField
                          {...field}
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          label="Nombre del afiliado"
                          error={meta.touched && !!meta.error}
                          helperText={meta.touched && meta.error}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormikAutocomplete
                      name="center"
                      options={centers}
                      label="Centro médico"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormikAutocomplete
                      name="doctor"
                      options={doctors}
                      label="Cirujano"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormikAutocomplete
                      name="social"
                      options={socials}
                      label="Obra social"
                      freeSolo
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormikAutocomplete
                      name="surgery"
                      options={surgeryTypes}
                      label="Cirugía"
                      freeSolo
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.buttons}>
                    <Button
                      disabled={isSubmitting}
                      variant="contained"
                      color="primary"
                      type="submit">
                      Guardar
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default NewSurgery;
