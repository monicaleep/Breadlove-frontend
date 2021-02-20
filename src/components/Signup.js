import React, { useState } from "react";
// Formik/yup
import { useFormik } from "formik";
import * as yup from "yup";
//material ui
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// helpers
import { resMessage } from "../utils/functions.utils";
import { register, login } from "../services/auth.service";
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  flex: {
    display: "flex",
    flexWrap: 'wrap',
    width: '200px',
    margin: '0 auto'
  },
});



const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  name: yup
    .string("Enter your username")
    .min(2, "Name should be a minimum of 2 characters length")
    .required("Username is required"),
});

const Signup = (props) => {
  const classes = useStyles()
  const history = useHistory();

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setMessage("");
      setLoading(true);
      register(values.name, values.email, values.password).then(
        (res) => {
          setMessage(res.data.message);
          setSuccessful(true);
          // log them in after
          login(values.email, values.password).then(() => {
            history.push("/");
            window.location.reload();
          });
        },
        (error) => {
          setSuccessful(false);
          setMessage(resMessage(error));
        }
      );
    },
  });

  return (
    <div className={classes.flex}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="name"
          name="name"
          label="Name"
          margin="normal"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={loading}
        >
          Submit
        </Button>
        {message && (
          <div
            className={
              successful ? "alert alert-success" : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;
