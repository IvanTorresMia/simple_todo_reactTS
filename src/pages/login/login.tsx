import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import helpers from "../../theme/helpers.module.css";
import mainStyle from "../../theme/main.module.css";

export function Login() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);

  const signInWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        margin={"40px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Typography variant="h2">Simple list</Typography>
        <Typography variant="subtitle1">Keep is simple and short</Typography>
      </Box>

      <Box
        marginTop={"40px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        className={`${helpers.heavyBoxShadow} ${mainStyle.secondaryBackground} ${helpers.borderRadius}`}
        width={"30%"}
        height={"200px"}
        flexDirection={"column"}
      >
        <Typography
          className={`${mainStyle.colorWhite}`}
          marginBottom={"20px"}
          variant="subtitle1"
        >
          Sign in or create an account!
        </Typography>
        <Button
          className={`${mainStyle.mainBackground}`}
          variant="contained"
          disabled={authing}
          onClick={() => signInWithGoogle()}
        >
          Sign in with Google
        </Button>
      </Box>
    </Box>
  );
}
