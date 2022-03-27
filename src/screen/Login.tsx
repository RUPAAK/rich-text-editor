import * as Yup from "yup";
import { FC, useEffect, useState } from "react";
import { Formik } from "formik";

import { Alert, AlertTitle } from "@material-ui/lab";

import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Checkbox,
  Typography,
  Link,
  FormControlLabel,
  CircularProgress,
  Container,
} from "@material-ui/core";
// import { userService } from "../../../http/userService";

import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { api } from "../http/api";
import Editor from "./Editor";
// import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

const LoginScreen: FC = (): JSX.Element => {
  let navigate = useNavigate();
  let location = useLocation();

  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");

    return () => {};
  }, []);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("The email provided should be a valid email address")
          .max(255)
          .required("The email field is required"),
        password: Yup.string()
          .max(255)
          .required("The password field is required"),
        terms: Yup.boolean().oneOf(
          [true],
          "You must agree to our terms and conditions"
        ),
      })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting }
      ): Promise<void> => {
        try {
          let res = await api.post("/admin/auth/signin", {
            email: values.email,
            password: values.password,
          });

          if (res && (res as unknown as any).accessToken) {
            await localStorage.setItem(
              "token",
              (res as unknown as any).accessToken
            );
            navigate("/");
            // <Navigate to="/" replace={true} />} />;
          }
        } catch (error: any) {
          var parsedErr;
          // console.error(error);
          if (error && error.errors) {
            parsedErr = error.errors.map((e: any) => e.message).join("|");
          }
          setErrorMessage(parsedErr || "Login Error. Please try again.");
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }): JSX.Element => (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <form
            noValidate
            onSubmit={handleSubmit}
            style={{ maxWidth: "400px" }}
          >
            <TextField
              error={Boolean(touched.email && errors.email)}
              fullWidth
              margin="normal"
              label="Email Address"
              autoFocus
              helperText={touched.email && errors.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
              variant="outlined"
            />

            <TextField
              error={Boolean(touched.password && errors.password)}
              fullWidth
              margin="normal"
              helperText={touched.password && errors.password}
              label="Password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
              variant="outlined"
            />

            {errorMessage && (
              <Alert severity="error" onClose={() => setErrorMessage("")}>
                <AlertTitle>Error</AlertTitle>
                {errorMessage}
              </Alert>
            )}

            <Button
              sx={{ mt: 3 }}
              color="primary"
              startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
              disabled={isSubmitting}
              type="submit"
              fullWidth
              size="large"
              variant="contained"
            >
              Sign in
            </Button>
          </form>
        </Container>
      )}
    </Formik>
  );
};

export default LoginScreen;
