import React from "react";
import { Box, Divider, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <Box
      component="nav"
      sx={{
        width: "100%",
        height: "60px",
        background: "#fff",
        borderBottom: "1px solid lightgray",
        paddingInline: "60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          fontSize={30}
          fontWeight="bold"
          color="#003A9B"
          sx={{ fontFamily: '"PT Serif", serif', marginRight: "10px" }}
        >
          JobPortal
        </Typography>
        <Typography
          fontSize={16}
          sx={{
            cursor: "pointer",
            color: "#2D2D2D",
            position: "relative",
            "&:hover::after": {
              content: '""',
              position: "absolute",
              bottom: "-18px",
              left: 0,
              width: "100%",
              height: "2px",
              backgroundColor: "#003A9B",
            },
          }}
        >
          Home
        </Typography>
        <Typography
          fontSize={16}
          sx={{
            cursor: "pointer",
            color: "#2D2D2D",
            position: "relative",
            "&:hover::after": {
              content: '""',
              position: "absolute",
              bottom: "-18px",
              left: 0,
              width: "100%",
              height: "2px",
              backgroundColor: "#003A9B",
            },
          }}
        >
          Jobs
        </Typography>
        <Typography
          fontSize={16}
          sx={{
            cursor: "pointer",
            color: "#2D2D2D",
            position: "relative",
            "&:hover::after": {
              content: '""',
              position: "absolute",
              bottom: "-18px",
              left: 0,
              width: "100%",
              height: "2px",
              backgroundColor: "#003A9B",
            },
          }}
        >
          Companies
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Typography
          fontSize={16}
          fontWeight={"bold"}
          sx={{
            cursor: "pointer",
            color: "#2557A7",
            position: "relative",
            "&:hover::after": {
              content: '""',
              position: "absolute",
              bottom: "-18px",
              left: 0,
              width: "100%",
              height: "2px",
              backgroundColor: "#003A9B",
            },
          }}
        >
          Sign in
        </Typography>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "lightgray" }}
        />
        <Typography
          fontSize={16}
          sx={{
            cursor: "pointer",
            color: "#2D2D2D",
            position: "relative",
            "&:hover::after": {
              content: '""',
              position: "absolute",
              bottom: "-18px",
              left: 0,
              width: "100%",
              height: "2px",
              backgroundColor: "#003A9B",
            },
          }}
        >
          Employers / Post Job
        </Typography>
      </Box>
    </Box>
  );
};

export default Navbar;
