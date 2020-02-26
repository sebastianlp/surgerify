import React from "react";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { useAuth } from "context/AuthContext";
import { useLoader } from "context/LoaderContext";
import { useSnackbar } from "context/SnackbarContext";

import Footer from "components/Footer";

const useStyles = makeStyles(theme => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  box: {
    marginTop: theme.spacing(8)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  apiError: {
    color: theme.palette.error.main,
    textAlign: "center"
  }
}));

function UnauthenticatedApp() {
  const { login } = useAuth();
  const showLoader = useLoader();
  const addSnackbar = useSnackbar();
  const classes = useStyles();

  function handleLogin({ email, password }) {
    showLoader(true);
    return login(email, password)
      .then(() => {
        showLoader(false);
      })
      .catch(e => {
        showLoader(false);
        console.error(e);
        addSnackbar("Ops! Ocurrió un error! 😔", "error");
        throw e;
      });
  }

  return (
    <Container maxWidth="xs" component="main" className={classes.mainContainer}>
      <Box
        className={classes.box}
        flexDirection="column"
        display="flex"
        alignItems="center"
      >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingresar
        </Typography>
        <LoginForm onSubmit={handleLogin} />
      </Box>
      <Footer />
    </Container>
  );
}

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("El email es incorrecto")
    .required("El email es requerido"),
  password: Yup.string().required("Ops! La contraseña es requerida")
});

function LoginForm({ onSubmit }) {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values).catch(e => {
          setSubmitting(false);
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className={classes.form}>
          <Field name="email">
            {({ field, form, meta }) => {
              return (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  label="Email"
                  fullWidth
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                />
              );
            }}
          </Field>
          <Field name="password">
            {({ field, form, meta }) => (
              <TextField
                {...field}
                type="password"
                variant="outlined"
                margin="normal"
                label="Contraseña"
                fullWidth
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className={classes.submit}
            color="primary"
            disabled={isSubmitting}
          >
            Ingresar
          </Button>
        </Form>
      )}
      {/* <form onSubmit={onSubmit} className={classes.form} noValidate> */}
      {/* <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid> */}
      {/* </form> */}
    </Formik>
  );
}

export default UnauthenticatedApp;
