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
        <Link to={"/"}>
          <Typography color={"#fff"} variant="h3">
            Simple list
          </Typography>
        </Link>

        <Box height={"100%"} display={"flex"}>
          <Link to={"/completed"}>
            <Button variant="text">Completed</Button>
          </Link>
          <Button variant="text">Other Option</Button>
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
