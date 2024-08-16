import {
  Box,
  Container,
  Divider,
  FormControl,
  TextField,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
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
          By creating an account or signing in, you understand and agree to
          jobPortal's Terms. You also consent to our Cookie and Privacy
          policies. You will receive marketing messages from jobPortal and may
          opt out at any time by following the unsubscribe link in our messages,
          or as detailed in our terms.
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
          />
          <TextField
            id="email"
            type="email"
            size="small"
            placeholder="Email"
            variant="outlined"
          />
          <TextField
            id="phone"
            type="tel"
            size="small"
            placeholder="Phone Number"
            variant="outlined"
          />
          <TextField
            id="password"
            type="password"
            size="small"
            placeholder="Password"
            variant="outlined"
          />
        </FormControl>
        <Button
          sx={{
            marginTop: "10px",
            fontWeight: "bold",
            fontSize: "15px",
          }}
          variant="contained"
        >
          Sign Up
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
