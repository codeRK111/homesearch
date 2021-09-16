import React, { useRef, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { leadStyle } from "./leads.style";
import { Form, Formik } from "formik";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import FTextField from "../../components/formik/textField.component";
import { withAsync } from "../../hoc/withAsync";
import { addLead } from "../../utils/asyncLead";
import Alert from "@material-ui/lab/Alert";
import useGlobalStyles from "../../common.style";
import { useHistory } from "react-router-dom";

const defaultAlertState = {
  open: false,
  type: "success",
  message: "",
};

const AddLeadsPage = ({ loading, setLoading, error, setError }) => {
  const history = useHistory();
  // Cancel Token
  const cancelToken = useRef();

  const validationSchema = Yup.object({
    name: Yup.string("Invalid name").matches(/^[a-zA-Z ]+$/, "Invalid Name"),
    email: Yup.string("Invalid email").email("Invalid email"),
    number: Yup.string("Invalid number")
      .length(10, "10 digits required")
      .matches(/^\d{10}$/, "Invalid Number")
      .required("Phone number required"),
  });

  // Style
  const style = leadStyle();
  const globalStyle = useGlobalStyles();

  // State
  const [alert, setAlert] = useState(defaultAlertState);

  // Callback

  const redirectToAllLeads = () => {
    history.push("/leads");
  };

  const handleAlert = (message, type = "success") => {
    setAlert({
      open: true,
      type,
      message,
    });
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      const token = axios.CancelToken;
      cancelToken.current = token.source();
      await addLead(values, cancelToken.current, setLoading);
      setError(null);
      resetForm();
      handleAlert("Posted Successfully");
    } catch (e) {
      setError(e);
      handleAlert(e, "error");
    }
  };

  const buttonProps = {};
  if (loading) {
    buttonProps.endIcon = <CircularProgress size={20} color="inherit" />;
  }
  return (
    <div className={style.wrapper}>
      <div className={globalStyle.justifyBetween}>
        <h1>Add Leads</h1>
        <Button onClick={redirectToAllLeads}>View Leads</Button>
      </div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          number: "",
          message: "",
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <Form>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <FTextField formLabel="Name" name={"name"} />
              </Grid>
              <Grid item xs={12} md={6}>
                <FTextField formLabel="Email" name={"email"} />
              </Grid>
              <Grid item xs={12}>
                <FTextField formLabel="Phone Number" name={"number"} />
              </Grid>
              <Grid item xs={12}>
                <FTextField
                  formLabel="Message"
                  name={"message"}
                  multiline={true}
                  rows={5}
                />
              </Grid>
              {alert.open && (
                <Grid item xs={12}>
                  <Alert
                    severity={alert.type}
                    onClose={() => {
                      setAlert(defaultAlertState);
                    }}
                  >
                    {alert.message}
                  </Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  variant={"contained"}
                  color={"primary"}
                  size={"large"}
                  type={"submit"}
                  disabled={loading}
                  {...buttonProps}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default withAsync(AddLeadsPage);
