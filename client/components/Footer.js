import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#EDF2FB",
    },
  },
});

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="black"
      align="center"
      fontFamily="Verdana"
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.youtube.com/watch?v=qv2C_m0D-gY">
        VFM
      </Link>{" "}
      {"2022"}
    </Typography>
  );
}

export const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "white",
          p: 3,
        }}
        component="footer"
      >
        <Copyright />
      </Box>
    </ThemeProvider>
  );
};
