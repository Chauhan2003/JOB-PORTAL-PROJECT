import {
  Box,
  Container,
  Divider,
  FormControl,
  TextField,
  Typography,
  Grid,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { userRoute } from "../../utils/Routes";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "student",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMess, setErrorMess] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(emailPattern.test(value) ? "" : "Invalid email format");
    } else if (name === "fullName") {
      setFullNameError(value ? "" : "Full name is required.");
    } else if (name === "password") {
      setPasswordError(
        value.length >= 8 ? "" : "Password must be at least 8 characters long"
      );
    } else if (name === "phone") {
      setPhoneError(
        value.length === 10 ? "" : "Phone number must be 10 digits"
      );
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.fullName) {
      setFullNameError("Full name is required.");
      return;
    }
    if (!formData.email) {
      setEmailError("Email is required.");
      return;
    }
    if (!formData.phone) {
      setPhoneError("Phone number is required.");
      return;
    }
    if (!formData.password) {
      setPasswordError("Password is required.");
      return;
    }

    if (fullNameError || emailError || phoneError || passwordError) {
      setErrorMess("Please correct the errors before submitting.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(`${userRoute}/register`, formData);
      setErrorMess("");
    } catch (err) {
      setIsError(true);
      setErrorMess(err.response.data.message || "Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#F3F2F1",
      }}
    >
      <Typography
        variant="h5"
        fontSize={30}
        fontWeight="bold"
        color="#003A9B"
        sx={{
          fontFamily: '"PT Serif", serif',
          marginRight: "10px",
          marginBottom: "20px",
        }}
      >
        JobPortal
      </Typography>
      <Container
        maxWidth="sm"
        sx={{
          background: "#fff",
          borderRadius: "6px",
          border: "1px solid lightgray",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          gap: "5px",
        }}
      >
        <Typography fontSize={19} color={"#2D2D2D"} fontWeight={"bold"}>
          Ready to take the next step?
        </Typography>
        <Typography fontSize={15} color={"#515151"}>
          Create an account or sign in.
        </Typography>
        <Typography fontSize={12} color={"#515151"}>
          By signing up or logging in, you agree to jobPortal's{" "}
          <span
            style={{
              color: "#003A9B",
              textDecoration: "underline",
            }}
          >
            Terms
          </span>{" "}
          and consent to our{" "}
          <span
            style={{
              color: "#003A9B",
              textDecoration: "underline",
            }}
          >
            Cookie and Privacy
          </span>{" "}
          Policies. You'll receive marketing messages from jobPortal, which you
          can opt out of anytime via the unsubscribe link in our emails or as
          outlined in our terms.
        </Typography>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <TextField
            id="fullName"
            type="text"
            size="small"
            placeholder="Full Name"
            variant="outlined"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={!!fullNameError}
            helperText={fullNameError}
          />
          <TextField
            id="email"
            type="email"
            size="small"
            placeholder="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            id="phone"
            type="tel"
            size="small"
            placeholder="Phone Number"
            variant="outlined"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={!!phoneError}
            helperText={phoneError}
          />
          <TextField
            id="password"
            type="password"
            size="small"
            placeholder="Password"
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={!!passwordError}
            helperText={passwordError}
          />
          <RadioGroup
            name="role"
            value={formData.role}
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value="student"
              control={<Radio />}
              label="Student"
            />
            <FormControlLabel
              value="recruiter"
              control={<Radio />}
              label="Recruiter"
            />
          </RadioGroup>
          {isError && (
            <Typography fontSize={15} color={"red"}>
              {errorMess}
            </Typography>
          )}
        </FormControl>
        <Button
          sx={{
            marginTop: "10px",
            fontWeight: "bold",
            fontSize: "15px",
          }}
          variant="contained"
          onClick={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={26} /> : "Sign Up"}
        </Button>
        <Grid container alignItems="center" sx={{ my: 1 }}>
          <Grid item xs>
            <Divider sx={{ borderColor: "gray" }} />
          </Grid>
          <Grid item>
            <Typography
              sx={{
                px: 2,
                color: "#515151",
              }}
            >
              or
            </Typography>
          </Grid>
          <Grid item xs>
            <Divider sx={{ borderColor: "gray" }} />
          </Grid>
        </Grid>
        <Typography>
          Already have an account?{" "}
          <Link
            to="/signin"
            style={{ textDecoration: "none", color: "#003A9B" }}
          >
            <Box
              component="span"
              sx={{
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Sign In
            </Box>
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Register;
