import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "../../theme/main.module.css";
import { getAuth, signOut } from "firebase/auth";

const Layout: React.FunctionComponent = () => {
  const auth = getAuth();
  return (
    <Grid>
      <Box
        padding={"1em"}
        display={"flex"}
        justifyContent={"space-between"}
        className={`${styles.mainBackground} ${styles.colorWhite}`}
      >
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Typography color={"#fff"} variant="h4">
            Simple list
          </Typography>
        </Link>

        <Box height={"100%"} display={"flex"}>
          <Link to={"/"}>
            <Button variant="text">Incomplete Tasks</Button>
          </Link>
          <Link to={"/completed"}>
            <Button variant="text">Completed Tasks</Button>
          </Link>
          <Button onClick={() => signOut(auth)} variant="outlined">
            Sign out
          </Button>
        </Box>
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Grid>
  );
};

export default Layout;
